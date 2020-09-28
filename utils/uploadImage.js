const axios = require('axios');

export const uploadImage = async (medias) => {
  const { file } = medias;
  try {
    // let requests = [];
    // for (let i = 0; i < file.length; i++) {
    let data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'reactreserve');
    data.append('cloud_name', `${process.env.CLOUDINARY_CLOUD_NAME}`);
    // requests.push(axios.post(process.env.CLOUDINARY_URL, data));
    // }
    const responses = await axios.post(process.env.CLOUDINARY_URL, data);
    console.log(responses.data);
    // const mediaUrls = await responses.map((response) => response.data.url);
    return;
    // return mediaUrls;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
