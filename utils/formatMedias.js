export const formatMedia = async (medias) => {
  const formattedMedias = medias.map((media) => {
    const data = new FormData();
    data.append('file', media);
    data.append('upload_preset', 'reactreserve');
    data.append('cloud_name', `${process.env.CLOUDINARY_CLOUD_NAME}`);
    return data;
  });
  return formattedMedias;
};

export default formatMedia;
