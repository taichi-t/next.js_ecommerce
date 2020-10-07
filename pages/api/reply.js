import jwt from 'jsonwebtoken';
import Reply from '../../models/Reply';
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
  const { refId: commentId, text } = req.body;
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    //create Reply documents, if doesn't exist
    await Reply.updateOne(
      { comment: ObjectId(commentId) },
      { $setOnInsert: { replies: [] } },
      { upsert: true }
    );

    const query = { comment: ObjectId(commentId) };
    const update = {
      replies: {
        user: userId,
        text: text,
        createdAt: new Date().toISOString(),
      },
    };

    const options = { new: true };

    const response = await Reply.findOneAndUpdate(
      query,
      { $push: update },
      options
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please try again');
  }
}

async function handleGetRequest(req, res) {
  const { commentId } = req.query;

  try {
    const response = await Reply.aggregate([
      { $match: { comment: ObjectId(commentId) } },
      { $match: { replies: { $exists: true, $ne: null } } },
      { $unwind: '$replies' },
      {
        $lookup: {
          from: 'users',
          localField: 'replies.user',
          foreignField: '_id',
          as: 'replies.user',
        },
      },
      {
        $project: {
          'replies.user': {
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
      { $unwind: '$replies.user' },
      {
        $group: {
          _id: '$_id',
          root: { $mergeObjects: '$$ROOT' },
          replies: { $push: '$replies' },
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

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please try again');
  }
}
