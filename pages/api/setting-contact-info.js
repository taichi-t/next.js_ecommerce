import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDb from '../../utils/connectDb';
import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL';
import isEmail from 'validator/lib/isEmail';

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
  const { twitter, instagram, contactEmail } = req.body;

  if (!isURL(twitter !== '' && twitter)) {
    return res.status(422).send('Twitter url must start with "https://......"');
  } else if (instagram !== '' && !isURL(instagram)) {
    return res
      .status(422)
      .send('Instagram url must start with "https://......"');
  } else if (contactEmail !== '' && !isEmail(contactEmail)) {
    return res.status(422).send('Email must be valid');
  }

  let contact = {};
  for (let key in req.body) {
    if (req.body[key] !== '') {
      contact[key] = req.body[key];
    }
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const response = await User.findOneAndUpdate(
      {
        _id: ObjectId(userId),
      },
      {
        $set: {
          ...contact,
        },
      },
      { upsert: true, new: true }
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please try again');
  }
}
