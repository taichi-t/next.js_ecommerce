import axios from 'axios';

export default async function handleImageUpload(media) {
  const data = new FormData();
  data.append('file', media);
  data.append('upload_preset', 'reactreserve');
  data.append('cloud_name', 'reedbargercodes');
  const response = await axios.post(process.env.CLOUDINARY_URL, data);
  const mediaUrl = response.data.url;
  return mediaUrl;
}
