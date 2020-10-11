import React, { useState, useRef } from 'react';
import { Input, Form, Button, Card, Image } from 'semantic-ui-react';

export default function ImagesUploader({
  state,
  setState,
  setError,
  error,
  prop,
}) {
  const [fileArray, setFileArray] = useState([]);
  const fileInputRef = useRef(null);

  const uploadMultipleFiles = (e) => {
    const { files } = e.target;
    const maxSize = 500000; //500k 5m
    const maxFile = 4;
    const fileObjs = [];
    const fileUrls = [];
    const isOverFile = state.length >= maxFile;
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
    setState((prevState) => ({ ...prevState, [prop]: state.concat(fileObjs) }));
    setFileArray(fileArray.concat(fileUrls));
  };

  const handleRemove = (index) => {
    const newState = state.filter((_, i) => i !== index);
    const newFileArray = fileArray.filter((_, i) => i !== index);
    setState((prevState) => ({ ...prevState, [prop]: newState }));
    setFileArray(newFileArray);
  };

  return (
    <>
      <Form.Field
        control={Input}
        label="Media"
        id="myForm"
        style={{ marginButtom: '1em' }}
        error={Boolean(error)}
      >
        <input
          ref={fileInputRef}
          name="media"
          type="file"
          accept="image/*"
          onChange={uploadMultipleFiles}
          multiple
          className="uploader"
        />
        <Button
          content="Choose Files"
          labelPosition="left"
          icon="file"
          form="myForm"
          onClick={() => fileInputRef.current.click()}
          style={{ marginBottom: '1em' }}
        />
      </Form.Field>

      <Card.Group itemsPerRow="3">
        {(fileArray || []).map((url, index) => (
          <Card key={url} index={index}>
            <Card.Content textAlign="center">
              <Image src={url} width="200px" />
            </Card.Content>
            <Card.Content extra>
              <Button
                basic
                color="red"
                form="myForm"
                onClick={() => handleRemove(index)}
              >
                remove
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  );
}
