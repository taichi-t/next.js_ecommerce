export default function formatImagePublicIds(urls) {
  // http://res.cloudinary.com/dhwqisywt/image/upload/v1600165511/pzk2j31hrh2ejkyq86u5.jpg
  const publicIds = urls.map((url) => {
    let key;
    key = url.split('/')[7];
    key = key.replace(/\..+$/, '');
    return key;
  });

  return { publicIds };
}
