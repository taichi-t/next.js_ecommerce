import middleware from '../../middleware/middleware';
import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';
// import deleteImage from '../../utils/deleteImage';
import formatImagePublicIds from '../../utils/formatImagePublicIds';
import { v2 as cloudinary } from 'cloudinary';
import User from '../../models/User';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = nextConnect();

handler.use(middleware);

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
      const publicId = formatImagePublicIds([profilePictureUrl]);
      await cloudinary.uploader.destroy(publicId);
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
