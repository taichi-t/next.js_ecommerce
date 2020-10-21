import React, { useState } from 'react';
import { Segment, Header, Icon, Container } from 'semantic-ui-react';
import useSavedProducts from '../hooks/useSavedProducts';
import SavedItemList from '../components/Saved/SavedItemList';
import SavedItemsSummary from '../components/Saved/SavedItemsSummary';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import catchErrors from '../utils/catchErrors';

function Saved() {
  const { products, loading, mutate } = useSavedProducts();
  const [removing, setRemoving] = useState(false);

  async function handleRemoveFromSaved(productId) {
    try {
      setRemoving(true);
      const url = `${baseUrl}/api/saved`;
      const token = cookie.get('token');
      const payload = {
        params: { productId },
        headers: { Authorization: token },
      };
      const response = await axios.delete(url, payload);
      mutate(products.filter((p) => p.product !== productId));
      setRemoving(false);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setRemoving(false);
    }
  }

  return (
    <Container text style={{ paddingTop: '1em' }}>
      <Header as="h2" color="pink" dividing>
        <Icon name="heart" />
        Saved Item List
      </Header>
      <Segment loading={removing}>
        <SavedItemList
          products={products}
          loading={loading}
          handleRemoveFromSaved={handleRemoveFromSaved}
        />
        <SavedItemsSummary products={products} loading={loading} />
      </Segment>
    </Container>
  );
}

export default Saved;
