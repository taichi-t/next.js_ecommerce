const axios = require('axios');

export const uploadImage = async (medias) => {
  const data = new FormData();
  try {
    // let promises = [];
    let requests = [];
    console.log(process.env.CLOUDINARY_URL);

    for (let i = 0; i < medias.length; i++) {
      data.append('file', medias[i]);
      data.append('upload_preset', 'reactreserve');
      data.append('cloud_name', 'reedbargercodes');
      requests.push(axios.post(process.env.CLOUDINARY_URL, data));
    }
    console.log(requests);
    const responses = await axios.all(requests);
    const mediaUrls = responses.map((response) => response.data.url);
    console.log({ mediaUrls });
    return mediaUrls;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
