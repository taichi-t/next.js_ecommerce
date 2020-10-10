import Product from '../models/Product';
import connectDb from './connectDb';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

connectDb();

export default async function getProduct(id) {
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
            role: 0,
            invitationCodeVerified: 0,
            email: 0,
            password: 0,
            updatedAt: 0,
            contactEmail: 0,
            instagram: 0,
            twitter: 0,
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
