const axios = require('axios');

export const uploadImage = async (medias) => {
  try {
    // let promises = [];
    let requests = [];
    console.log(process.env.CLOUDINARY_URL);

    for (let i = 0; i < medias.length; i++) {
      let data = new FormData();
      data.append('file', medias[i]);
      data.append('upload_preset', 'reactreserve');
      data.append('cloud_name', `${process.env.CLOUDINARY_CLOUD_NAME}`);
      requests.push(axios.post(process.env.CLOUDINARY_URL, data));
    }
    console.log('requests', requests);
    const responses = await axios.all(requests);
    console.log('responses', responses);
    const mediaUrls = await responses.map((response) => response.data.url);
    console.log('mediaUrls', mediaUrls);

    return mediaUrls;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
