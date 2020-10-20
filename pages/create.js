import React, { useState, useEffect } from 'react';
import { mutate } from 'swr';
import {
  Input,
  TextArea,
  Button,
  Message,
  Header,
  Icon,
  Form,
  Container,
} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
import cookie from 'js-cookie';
import useImageUploader from '../hooks/useImageUploader';
import UploadForm from '../components/ImageUploader/UploadForm';
import ImagePreviews from '../components/ImageUploader/ImagePreviews';

const INITIAL_PRODUCT = {
  name: '',
  price: '',
  description: '',
};
function CreateProduct() {
  const {
    handleRemove,
    onLoad,
    previews,
    medias,
    error: uploadError,
  } = useImageUploader();
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isProduct = Object.values(product).every((el) => Boolean(el));
    const isMedias = medias.length > 0;
    isMedias && isProduct ? setDisabled(false) : setDisabled(true);
  }, [product, medias]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  }

  useEffect(() => {
    setError(uploadError);
  }, [uploadError]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      setError('');
      const token = cookie.get('token');
      const { name, price, description } = product;
      const formData = new FormData();
      medias.forEach((el) => {
        formData.append('files', el);
      });
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      const headers = {
        headers: {
          Authorization: token,
          'content-type': 'multipart/form-data',
        },
      };
      const url = `${baseUrl}/api/product`;
      await axios.post(url, formData, headers);
      mutate(`${baseUrl}/api/products`);
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
    <Container text>
      <Header as="h2" color="teal" dividing>
        <Icon name="add" />
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
        </Form.Group>

        <Form.Group style={{ display: 'block' }}>
          <UploadForm onLoad={onLoad} />
          <ImagePreviews handleRemove={handleRemove} previews={previews} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={TextArea}
            name="description"
            label="Description"
            placeholder="Description"
            onChange={handleChange}
            value={product.description}
          />
        </Form.Group>
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </Container>
  );
}

export default CreateProduct;
