import React from 'react';
import { Button, Image, Card, Message } from 'semantic-ui-react';
import ImageUploading from 'react-images-uploading';

export default function ImagesForm({ state, setState, maxNumber }) {
  const [error, setError] = React.useState('');
  const onChange = (imageList, addUpdateIndex) => {
    setState((prevState) => ({ ...prevState, media: imageList }));
  };

  return (
    <ImageUploading
      multiple
      value={state.media}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
      acceptType={['jpg', 'gif', 'png', 'PNG']}
      onError={(error) => {
        if (error.acceptType) {
          setError('Invalid type of file');
        } else if (error.maxFileSize) {
          setError('The file is too large');
        } else if (error.maxNumber) {
          setError(`The limit is ${maxNumber}`);
        } else {
          setError('Error');
        }
      }}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI

        <>
          <Button
            style={isDragging ? { color: 'red' } : undefined}
            onClick={onImageUpload}
            {...dragProps}
            form="images-form"
          >
            Click or Drop here
          </Button>
          &nbsp;
          <Button onClick={onImageRemoveAll} form="images-form">
            Remove all images
          </Button>
          <Card.Group
            itemsPerRow="3"
            stackable
            centered
            style={{ margin: '0' }}
          >
            {imageList.map((image, index) => (
              <Card key={index} fluid>
                <Image src={image['data_url']} size="small" centered />
                <Card.Content>
                  <div className="ui two buttons">
                    <Button
                      onClick={() => onImageUpdate(index)}
                      form="images-form"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => onImageRemove(index)}
                      form="images-form"
                      color="red"
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          <Message
            color="yellow"
            header={error}
            hidden={!Boolean(error)}
            icon="warning sign"
          />
        </>
      )}
    </ImageUploading>
  );
}
