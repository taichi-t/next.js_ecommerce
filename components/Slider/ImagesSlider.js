import Slider from 'react-slick';
import { Image, Item } from 'semantic-ui-react';

function ImagesSlider({ imageUrls }) {
  const settings = {
    arrow: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {imageUrls.map((url) => (
        <Image src={url} size="medium" key={url} />
      ))}
    </Slider>
  );
}

export default ImagesSlider;
