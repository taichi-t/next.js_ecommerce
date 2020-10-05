import Product from '../models/Product';
import connectDb from './connectDb';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

connectDb();

export default async function getProductData(id) {
  try {
    const product = await Product.aggregate([
      { $match: { _id: ObjectId(id) } },

      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },

      {
        $project: {
          user: {
            _id: 0,
            role: 0,
            invitationCodeVerified: 0,
            email: 0,
            password: 0,
            updatedAt: 0,
          },
        },
      },

      { $unwind: '$user' },
    ]);
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error(error);
  }
}
