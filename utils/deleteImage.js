import axios from 'axios';

export default async function handleImageUpload({ publicIds }) {
  const url = `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload`;
  const response = await axios.delete(url, {
    data: { public_ids: publicIds },
  });
  return response;
}
