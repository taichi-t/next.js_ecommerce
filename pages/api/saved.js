import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Save from '../../models/Save';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'PUT':
      await handlePutRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    await Save.updateOne(
      { user: ObjectId(userId) },
      { $setOnInsert: { products: [] } },
      { upsert: true }
    );

    const save = await Save.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
      populate: {
        path: 'user',
        model: 'User',
        select: { name: 1, profilePictureUrl: 1 },
      },
    });
    res.status(200).json(save.products);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again');
  }
}

async function handlePutRequest(req, res) {
  const { productId } = req.body;
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // Get user cart based on userId
    let save;

    await Save.updateOne(
      { user: ObjectId(userId) },
      { $setOnInsert: { products: [] } },
      { upsert: true }
    );
    save = await Save.findOne({ user: userId });

    // Check if product already exists in cart
    const productExists = save.products.some((doc) =>
      ObjectId(productId).equals(doc.product)
    );
    // If so, increment quantity (by number provided to request)
    if (productExists) {
      return res.status(204).send('The item already added');
    } else {
      // If not, add new product
      const newProduct = { product: productId };
      await Save.findOneAndUpdate(
        { _id: save._id },
        { $addToSet: { products: newProduct } }
      );
      await Product.findOneAndUpdate(
        { _id: productId },
        { $inc: { wantCounter: 1 } }
      );

      res.status(200).send('Saved Items updated');
    }
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again');
  }
}

async function handleDeleteRequest(req, res) {
  const { productId } = req.query;
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    await Product.findOneAndUpdate(
      { _id: productId },
      { $inc: { wantCounter: -1 } }
    );

    const save = await Save.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: 'products.product',
      model: 'Product',
    });

    res.status(200).json(save.products);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again');
  }
}
