import React, { useState, useEffect } from 'react';
import {
  From,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
  Form,
} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
import uploadImage from '../utils/uploadImage';
const INITIAL_PRODUCT = {
  name: '',
  price: '',
  media: [],
  description: '',
};
function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isProduct = Object.values(product).every((el) => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === 'media') {
      setProduct((prevState) => ({
        ...prevState,
        media: product.media.concat(files),
      }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await uploadImage(product.media);
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
      await axios.post(url, payload);
      setLoading(false);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
      console.error('ERROR!', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form
        loading={loading}
        success={success}
        error={Boolean(error)}
        onSubmit={handleSubmit}
      >
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Message error header="Oops!" content={error} />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            onChange={handleChange}
            value={product.name}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            onChange={handleChange}
            value={product.price}
          />
          <Form.Field
            control={Input}
            name="media"
            label="Media"
            type="file"
            multiple
            content="Select Image"
            accept="image/*"
            onChange={handleChange}
            value={product.files}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
