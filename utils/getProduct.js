import Product from '../models/Product';
import connectDb from './connectDb';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

connectDb();

export default async function getProduct(id) {
  try {
    const product = await Product.findOne({
      _id: ObjectId(id),
    }).populate('user', 'profilePicture name _id', 'User');
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error(error);
  }
}
