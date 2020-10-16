import React, { useContext } from 'react';
import { Header, Segment, Button, Icon, Item } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { UserContext } from '../../utils/UserProvider';
import SavedItem from '../Saved/SavedItem';
import Skeleton from 'react-loading-skeleton';
import CardSkeleton from '../Skeleton/CardSkeleton';

function SavedItemList({ products, handleRemoveFromSaved, loading }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (loading) {
    return <CardSkeleton count={2} />;
  }

  if (!products || products.length === 0) {
    return (
      <Segment secondary inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="heart" />
          No saved Items.
        </Header>
        <div>
          {Object.keys(user).length ? (
            <Button color="orange" onClick={() => router.push('/')}>
              View Proucts
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push('/login')}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    );
  }
  return (
    <Item.Group divided>
      {products.map((p) => (
        <SavedItem
          key={p.product._id}
          product={p.product}
          handleRemoveFromSaved={handleRemoveFromSaved}
        />
      ))}
    </Item.Group>
  );
}

export default SavedItemList;
