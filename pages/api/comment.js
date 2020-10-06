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

    await Comments.findOneAndUpdate(
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
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(403).send('Please try again');
  }
}
