import { Header, Button, Modal } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
function ProductAttributes({ user, product }) {
  const { description, _id } = product;
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRoorOrAdmin = isRoot || isAdmin;

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
  return (
    <>
      <Header as="h3">about this product</Header>
      <p>{description}</p>
      {isRoorOrAdmin && (
        <>
          <Button
            icon="trash alternate outline"
            color="red"
            content="Delete Product"
            onClick={() => setModal(true)}
          />
          <Modal open={modal} dimmer="blurring" size="tiny">
            <Modal.Header>Confirm Delete</Modal.Header>
            <Modal.Content>Confirm Delete</Modal.Content>
            <Modal.Actions>
              <Button content="Cancel" onClick={() => setModal(false)} />
              {user._id === product.user._id && (
                <Button
                  icon="trash"
                  negative
                  content="Delete"
                  labelPosition="right"
                  onClick={handleDelete}
                  loading={loading}
                />
              )}
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  );
}

export default ProductAttributes;
