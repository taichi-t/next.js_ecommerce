import Slider from 'react-slick';
import { Image, Icon, Button } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';

function ImagesSlider({ imageUrls }) {
  const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.3)',
  };
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      useKeyboardArrows
      className="presentation-mode"
      infiniteLoop={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <Button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: 10 }}
            icon="angle left"
            size="mini"
          />
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <Button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, right: 10 }}
            icon="angle right"
            size="mini"
          />
        )
      }
    >
      {imageUrls.map((url) => (
        <img src={url} size="medium" key={url} />
      ))}
    </Carousel>
  );
}

export default ImagesSlider;
