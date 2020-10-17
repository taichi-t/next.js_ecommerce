import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { ObjectId } = mongoose.Types;

connectDb();

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  );

  const query = [
    { $match: { user: ObjectId(userId) } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'product',
        as: 'commentCounter',
      },
    },
    { $unwind: '$commentCounter' },
    {
      $addFields: {
        commentCounter: { $size: '$commentCounter.comments' },
      },
    },
  ];

  const products = await Product.aggregate(query);

  return res.status(200).json(products);
};
