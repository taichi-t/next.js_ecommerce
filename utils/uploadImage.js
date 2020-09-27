const axios = require('axios');

export const uploadImage = async (medias) => {
  try {
    // let promises = [];
    let requests = [];
    console.log(
      'NEXT_PUBLIC_CLOUDINARY_URL',
      process.env.NEXT_PUBLIC_CLOUDINARY_URL
    );

    for (let i = 0; i < medias.length; i++) {
      let data = new FormData();
      data.append('file', medias[i]);
      data.append('upload_preset', 'reactreserve');
      data.append('cloud_name', 'dhwqisywt');
      requests.push(axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL, data));
    }
    const responses = await axios.all(requests);
    const mediaUrls = await responses.map((response) => response.data.url);

    return mediaUrls;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
