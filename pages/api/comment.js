import jwt from 'jsonwebtoken';
import Comment from '../../models/Comment';
import connectDb from '../../utils/connectDb';
import mongoose from 'mongoose';
import Replies from '../../components/Comments/Replies';
import { resources } from 'stripe';

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
  const { productId, text } = req.body;
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const query = { product: ObjectId(productId) };
    const update = {
      comments: {
        user: userId,
        text: text,
        createdAt: new Date().toISOString(),
      },
    };

    const options = { upsert: true, new: true };

    const response = await Comment.findOneAndUpdate(
      query,
      { $push: update },
      options
    ).populate({
      path: 'comments.user',
      model: 'User',
      select: {
        _id: 0,
        role: 0,
        invitationCodeVerified: 0,
        email: 0,
        password: 0,
        updatedAt: 0,
        createdAt: 0,
      },
    });
    // .exec(function (error, result) {
    //   if (error) {
    //     res.state(403).send('Error in updating user info', error);
    //   } else {
    //     res.status(200).json(result);
    //   }
    // });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please try again');
  }
}

async function handleGetRequest(req, res) {
  const { productId } = req.query;

  try {
    const response = await Comment.findOne({
      product: Object(productId),
    }).populate({
      path: 'comments.user',
      model: 'User',
      select: {
        _id: 0,
        role: 0,
        invitationCodeVerified: 0,
        email: 0,
        password: 0,
        updatedAt: 0,
        createdAt: 0,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please try again');
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
