import Product from '../models/Product';
import connectDb from '../utils/connectDb';
import mongoose from 'mongoose';

connectDb();

const { ObjectId } = mongoose.Types;

export default async function getProduct(id) {
  const product = await Product.findOne({
    _id: ObjectId(id),
  }).populate('user', 'profilePicture name _id');

  return JSON.parse(JSON.stringify(product));
}
