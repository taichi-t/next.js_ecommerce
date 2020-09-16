export default function formatImagePublicIds(urls) {
  const publicIds = urls.map((url) => {
    let key;
    key = url.split('/')[7];
    key = key.replace(/\..+$/, '');
    return key;
  });

  return { publicIds };
}
