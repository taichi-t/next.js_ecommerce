import { useState } from 'react';

export default function useImageUploader() {
  const [medias, setMedia] = useState([]);
  const [error, setError] = useState();
  const [previews, setPreviews] = useState([]);

  const onLoad = (e) => {
    const { files } = e.target;
    const maxSize = 5000000; //500k 5m
    const maxFile = 4;
    const fileObjs = [];
    const fileUrls = [];
    const isOverFile = medias.length >= maxFile;
    if (isOverFile) {
      return setError('Files must be within 4');
    }
    for (var i = 0; i < files.length; i++) {
      if (files[i].size >= maxSize) {
        return setError('Each File size is up to 5M');
      }
      fileObjs.push(files[i]);
      fileUrls.push(URL.createObjectURL(files[i]));
    }

    setMedia(medias.concat(fileObjs));
    setPreviews(previews.concat(fileUrls));
  };

  const handleRemove = (index) => {
    const newMedia = medias.filter((_, i) => i !== index);
    const newpreviews = previews.filter((_, i) => i !== index);
    setMedia(newMedia);
    setPreviews(newpreviews);
  };

  return { handleRemove, onLoad, previews, medias, error };
}
