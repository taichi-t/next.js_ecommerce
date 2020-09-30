import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';
import Cart from '../../models/Cart';
import { v2 as cloudinary } from 'cloudinary';
import middleware from '../../middleware/middleware';
import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = nextConnect();

handler.use(middleware);

connectDb();

handler.delete(async (req, res) => {
  const { _id } = req.query;
  try {
    //1) Delete product by id
    await Product.findOneAndDelete({ _id });
    //2) Remove product from all carts, referenced as "product"
    await Cart.updateMany(
      { 'products.product': _id },
      { $pull: { products: { product: _id } } }
    );
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
    const files = req.files['files'];
    const { name, price, description } = req.body;
    if (!name || !price || !description || !files) {
      return res.status(422).send('Product missing one or more fields');
    }
    const promises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file.path, (error, result) => {
            if (error) {
              reject(console.error(error));
            } else {
              resolve(result.url);
            }
          });
        })
    );

    const mediaUrls = await Promise.all(promises);

    const product = await new Product({
      name,
      price,
      description,
      mediaUrls,
    }).save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error in creating product');
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
