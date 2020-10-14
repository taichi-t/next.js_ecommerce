import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';
import Save from '../../models/Save';
import { v2 as cloudinary } from 'cloudinary';
import middleware from '../../middleware/middleware';
import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import Comment from '../../models/Comment';
import mongoose from 'mongoose';

connectDb();

const { ObjectId } = mongoose.Types;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = nextConnect();

handler.use(middleware);

handler.delete(async (req, res) => {
  const { _id } = req.query;
  try {
    //1) Delete product by id
    await Product.findOneAndDelete({ _id });
    //2) Remove product from all saved items, referenced as "product"
    await Save.updateMany(
      { 'products.product': _id },
      { $pull: { products: { product: _id } } }
    );
    //3) Remove comments with product id
    await Comment.findOneAndDelete({ product: _id });
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting product');
  }
});

handler.post(async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const files = req.files['files'];
    const { name, price, description } = req.body;
    if (!name || !price || !description || !files) {
      return res.status(422).send('Product missing one or more fields');
    }

    let product = await new Product({
      user: userId,
      name,
      price,
      description,
      sku: shortid.generate(),
    }).save();

    let medias;
    if (files.length) {
      const promises = files.map(
        (file) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              file.path,
              {
                height: 350,
                width: 350,
                crop: 'pad',
                background: 'auto:predominant',
                folder: `${userId}/product/${product._id}`,
              },
              (error, result) => {
                if (error) {
                  reject(console.error(error));
                } else {
                  resolve({ url: result.url, publicId: result.public_id });
                }
              }
            );
          })
      );
      medias = await Promise.all(promises);
    } else {
      const result = await cloudinary.uploader.upload(
        files.path,
        {
          height: 350,
          width: 350,
          crop: 'pad',
          background: 'auto:predominant',
          folder: `${userId}/product/${product._id}`,
        },
        (error) => {
          if (error) {
            console.error(error);
          }
        }
      );
      medias = { url: result.url, publicId: result.public_id };
    }

    product = await Product.findOneAndUpdate(
      {
        _id: product._id,
      },
      { medias }
    );

    await new Comment({
      product: product._id,
      comments: [],
    }).save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error in creating product');
  }
});

handler.get(async (req, res) => {
  const { id } = req.query;
  try {
    const product = await Product.findOne({
      _id: ObjectId(id),
    }).populate('user', 'profilePicture name _id', 'User');

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting product');
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
