import jwt from 'jsonwebtoken';
import deleteImage from '../../utils/deleteImage';
import formatImagePublicIds from '../../utils/formatImagePublicIds';

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
  const { media } = req.body;
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  try {
    if (profilePictureUrl) {
      await deleteImage(formatImagePublicIds([profilePictureUrl]));
    }
    res.status(203).send('Uploaded');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
