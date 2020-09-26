import axios from 'axios';

export const uploadImage = async (medias, headers) => {
  const data = new FormData();
  try {
    let promises = [];
    for (let i = 0; i < medias.length; i++) {
      data.append('file', medias[i]);
      data.append('upload_preset', 'reactreserve');
      data.append('cloud_name', 'reedbargercodes');
      const response = await axios.post(process.env.CLOUDINARY_URL, data);
      const mediaUrl = response.data.url;
      promises.push(mediaUrl);
    }
    const mediaUrls = await Promise.all(promises);
    return mediaUrls;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
