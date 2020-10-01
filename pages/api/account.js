import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';
import { v2 as cloudinary } from 'cloudinary';
import middleware from '../../middleware/middleware';
import nextConnect from 'next-connect';
import formatImagePublicIds from '../../utils/formatImagePublicIds';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = nextConnect();

handler.use(middleware);

connectDb();

handler.get(async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(403).send('Invalid token');
  }
});

handler.put(async (req, res) => {
  const { _id, role } = req.body;
  await User.findOneAndUpdate({ _id }, { role });
  res.status(203).send('User updated');
});

handler.post(async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  try {
    const files = req.files;
    const { profilePictureUrl } = req.body;
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const { url: newProfilePictureUrl } = await cloudinary.uploader.upload(
      files.file.path,
      {
        width: 250,
        height: 250,
        radius: 'max',
        background: 'white',
        crop: 'pad',
      },
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );
    if (newProfilePictureUrl) {
      await User.findOneAndUpdate(
        { _id: userId },
        { profilePictureUrl: newProfilePictureUrl }
      );
    }
    if (profilePictureUrl) {
      const { publicIds } = formatImagePublicIds([profilePictureUrl]);
      await cloudinary.uploader.destroy(publicIds, (error, result) => {
        if (error) {
          console.error(error);
        }
      });
    }
    res.status(203).json(newProfilePictureUrl);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
