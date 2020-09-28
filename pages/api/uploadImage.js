// import HttpStatus from 'http-status-codes';
import middleware from '../../middleware/middleware';
import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';
import deleteImage from '../../utils/deleteImage';
import formatImagePublicIds from '../../utils/formatImagePublicIds';
import uploadImage from '../../utils/uploadImage';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  try {
    const files = req.files;
    const body = req.body;
    // do stuff with files and body
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const newProfilePictureUrl = await uploadImage(files);

    return;
    await User.findOneAndUpdate(
      { _id: userId },
      { profilePictureUrl: newProfilePictureUrl[0] }
    );
    if (profilePictureUrl) {
      await deleteImage(formatImagePublicIds([profilePictureUrl]));
    }
    res.status(203).send('User updated');
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
