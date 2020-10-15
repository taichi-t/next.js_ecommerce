import connectDb from '../../utils/connectDb';
import mongoose from 'mongoose';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import InvitationCode from '../../models/InvitationCode';
import Save from '../../models/Save';

connectDb();

export default async (req, res) => {
  const { name, email, password, invitationCode } = req.body;
  //start transaction
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    const isValidatedInvitationCode = await InvitationCode.findOne({
      invitationCode: invitationCode,
    });
    //1)validate name / email / password / invitation code
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send('Password must be at least 6 characters');
    } else if (!isEmail(email)) {
      return res.status(422).send('Email must be valid');
    } else if (!isValidatedInvitationCode) {
      return res.status(422).send('Invitation Code is not valid');
    }
    //2) check to see if the user already esxist in the db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    //3) if not,  hash their password
    const hash = await bcrypt.hash(password, 10);
    //4) create user
    const newUser = await new User({
      name,
      email,
      password: hash,
      invitationCodeVerified: true,
    }).save();
    //5) create cart for newuser
    await new Save({ user: newUser._id }).save();
    //6) create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    //7) send back token
    res.status(201).json(token);
    //8) delete the invitation code
    // await InvitationCode.remove({ invitationCode: invitationCode });
    //9)end transaction
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signup user. Please try again later');
    //9)end transaction
    await session.abortTransaction();
    session.endSession();
  }
};
