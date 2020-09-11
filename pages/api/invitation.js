import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';
import User from '../../models/User';
import connectDb from '../../utils/connectDb';
import InvitationCode from '../../models/InvitationCode';

connectDb();

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
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    //1) make sure the user is admin or root
    const user = await User.findOne({ _id: userId });
    const isAdminOrRoot = user.role === 'admin' || user.role === 'root';
    if (!isAdminOrRoot) {
      return res.status(422).send(`No authorization`);
    }
    //2) make sure the user's invitaion is existed or not
    const isInvitation = await InvitationCode.findOne({ user: userId });

    if (isInvitation !== null) {
      return res.status(201).json(isInvitation.invitationCode);
    }
    //3) create new invitation for the user and generate unique code
    const newInvitation = await new InvitationCode({
      user: user._id,
      invitationCode: uuidv4(),
    }).save();
    //4) send the code to the client
    const { invitationCode } = newInvitation;
    res.status(201).json(invitationCode);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again');
  }
}
