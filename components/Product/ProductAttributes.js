import { Header, Button, Modal } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';
function ProductAttributes({ user, product }) {
  const { description, _id } = product;
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRoorOrAdmin = isRoot || isAdmin;

  async function handleDelete() {
    const url = `${baseUrl}/api/product`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push('/');
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
          <Modal open={modal} dimmer="blurring">
            <Modal.Header>Confirm Delete</Modal.Header>
            <Modal.Content>Confirm Delete</Modal.Content>
            <Modal.Actions>
              <Button content="Cancel" onClick={() => setModal(false)} />
              <Button
                icon="trash"
                negative
                content="Delete"
                labelPosition="right"
                onClick={handleDelete}
              />
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  );
}

export default ProductAttributes;
