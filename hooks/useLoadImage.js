import { useState } from 'react';

export default function useLoadImages() {
  const [loaded, setLoaded] = useState(false);

  const onLoadImage = () => {
    setLoaded(true);
  };
  return { onLoadImage, loaded };
}
