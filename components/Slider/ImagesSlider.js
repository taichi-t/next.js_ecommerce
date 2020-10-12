import { Image, Button, Item } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';

function ImagesSlider({ medias }) {
  const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 10px)',
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.3)',
  };
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      useKeyboardArrows
      infiniteLoop={true}
      renderArrowPrev={(onClickHandler, hasPrev) =>
        hasPrev && (
          <Button
            type="button"
            onClick={onClickHandler}
            style={{ ...arrowStyles, left: 10 }}
            icon="angle left"
            size="mini"
          />
        )
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <Button
            type="button"
            onClick={onClickHandler}
            style={{ ...arrowStyles, right: 10 }}
            icon="angle right"
            size="mini"
          />
        )
      }
    >
      {medias.map((media) => (
        <Image src={media.url} key={media.url} />
      ))}
    </Carousel>
  );
}

export default ImagesSlider;
