import jwt from 'jsonwebtoken';
import Comments from '../../models/Comments';
import connectDb from '../../utils/connectDb';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await handlePostRequest(req, res);
      break;
    case 'GET':
      await handleGetRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handlePostRequest(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  const { refId: productId, text } = req.body;
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    await Comments.updateOne(
      { product: ObjectId(productId) },
      { $setOnInsert: { comments: [] } },
      { upsert: true }
    );

    const response = await Comments.findOneAndUpdate(
      { product: ObjectId(productId) },
      {
        $push: {
          comments: {
            user: userId,
            text: text,
            createdAt: new Date().toISOString(),
          },
        },
      }
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please try again');
  }
}

async function handleGetRequest(req, res) {
  const { productId } = req.query;
  try {
    const response = await Comments.aggregate([
      { $match: { product: ObjectId(productId) } },
      { $unwind: '$comments' },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.user',
          foreignField: '_id',
          as: 'comments.user',
        },
      },
      {
        $project: {
          'comments.user': {
            _id: 0,
            role: 0,
            invitationCodeVerified: 0,
            email: 0,
            password: 0,
            updatedAt: 0,
            createdAt: 0,
          },
        },
      },
      { $unwind: '$comments.user' },
      {
        $group: {
          _id: '$_id',
          root: { $mergeObjects: '$$ROOT' },
          comments: { $push: '$comments' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$root', '$$ROOT'],
          },
        },
      },
      {
        $project: {
          root: 0,
        },
      },
    ]);

    res.status(200).json(response[0]);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please try again');
  }
}
