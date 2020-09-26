import axios from 'axios';

export const uploadImage = async (medias, headers) => {
  const data = new FormData();
  try {
    // let promises = [];
    let requests = [];

    for (let i = 0; i < medias.length; i++) {
      data.append('file', medias[i]);
      data.append('upload_preset', 'reactreserve');
      data.append('cloud_name', 'reedbargercodes');
      requests.push(axios.post(process.env.CLOUDINARY_URL, data));
    }
    const responses = await axios.all(requests);
    const mediaUrls = responses.map((response) => response.data.url);
    return mediaUrls;
  } catch (error) {
    console.error(error);
  }
};

axios.all([]);

export default uploadImage;
