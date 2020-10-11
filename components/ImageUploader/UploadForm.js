import { Input, Form, Button } from 'semantic-ui-react';
import React, { useRef } from 'react';

export default function UploadForm({ error, onLoad }) {
  const uploaderRef = useRef(null);
  return (
    <>
      <Form.Field
        control={Input}
        label="Media"
        id="image-form"
        style={{ marginButtom: '1em' }}
        error={Boolean(error)}
      >
        <input
          ref={uploaderRef}
          name="media"
          type="file"
          accept="image/*"
          onChange={onLoad}
          multiple
          className="uploader"
        />
        <Button
          content="Choose Files"
          labelPosition="left"
          icon="file"
          form="myForm"
          onClick={() => uploaderRef.current.click()}
          style={{ marginBottom: '1em' }}
        />
      </Form.Field>
    </>
  );
}
