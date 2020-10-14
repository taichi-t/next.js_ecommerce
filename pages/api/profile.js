import mongoose from 'mongoose';
import connectDb from '../../utils/connectDb';
import User from '../../models/User';

connectDb();

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  try {
    const { sellerId } = req.query;
    const sellerProfile = await User.findOne(
      { _id: ObjectId(sellerId) },
      { twitter: 1, instagram: 1, contactEmail: 1 }
    );

    res.status(200).json(sellerProfile);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again');
  }
}
