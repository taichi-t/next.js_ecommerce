import { Header, Button, Modal } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import ModalForm from '../Modal/ModalForm';

function ProductAttributes({ user, product }) {
  const { description, _id } = product;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRoorOrAdmin = isRoot || isAdmin;
  const isUsersProduct = user._id === product.user._id;

  async function handleDelete() {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/product`;
      const token = cookie.get('token');
      await axios.delete(url, {
        headers: {
          Authorization: token,
        },
        params: { productId: _id },
      });
      setLoading(false);
      setModal(false);
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoading(false);
    }
  }

  const confirm = (
    <>
      <Modal.Header>Confirm Delete</Modal.Header>
      <Modal.Content>
        Are you sure you want to delete <strong>"{product.name}"</strong>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cancel"
          onClick={() => setOpen(false)}
          disabled={loading}
        />
        <Button
          icon="trash"
          negative
          content="Delete"
          labelPosition="right"
          loading={loading}
          onClick={handleDelete}
        />
      </Modal.Actions>
    </>
  );

  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      {isRoorOrAdmin && (
        <ModalForm
          trigger={
            isUsersProduct && (
              <Button
                icon="trash alternate outline"
                color="red"
                content="Delete Product"
                onClick={() => setOpen(true)}
              />
            )
          }
          open={open}
          setOpen={setOpen}
          component={confirm}
        />
      )}
    </>
  );
}

export default ProductAttributes;
