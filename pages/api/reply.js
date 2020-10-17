import jwt from 'jsonwebtoken';
import Reply from '../../models/Reply';
import connectDb from '../../utils/connectDb';
import mongoose from 'mongoose';
import User from '../../models/User';

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
  const { commentId, text } = req.body;
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const query = { comment: ObjectId(commentId) };
    const update = {
      replies: {
        user: userId,
        text: text,
        createdAt: new Date().toISOString(),
      },
    };

    const options = { upsert: true, new: true };

    await Reply.findOneAndUpdate(query, { $push: update }, options)
      .populate({
        path: 'replies.user',
        model: User,
        select: {
          _id: 0,
          role: 0,
          invitationCodeVerified: 0,
          email: 0,
          password: 0,
          updatedAt: 0,
          createdAt: 0,
        },
      })
      .exec(function (error, result) {
        if (error) {
          return res.state(403).send('Error in updating user info', error);
        } else {
          return res.status(200).json(result);
        }
      });
  } catch (error) {
    console.error(error);
    return res.status(403).send('Please try again');
  }
}

async function handleGetRequest(req, res) {
  const { commentId } = req.query;

  try {
    const response = await Reply.findOneAndUpdate(
      {
        comment: Object(commentId),
      },
      {
        $setOnInsert: { replies: [] },
      },
      {
        new: true,
        upsert: true,
      }
    ).populate({
      path: 'replies.user',
      model: User,
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

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(403).send('Please try again');
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
