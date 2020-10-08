import React, { useContext } from 'react';
import {
  Header,
  Segment,
  Button,
  Icon,
  Item,
  Message,
  Label,
  Image,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { UserContext } from '../../utils/UserProvider';
import Skeleton from 'react-loading-skeleton';
import ImagesSlider from '../../components/Slider/ImagesSlider';

function SavedItemList({ products, handleRemoveFromSaved, loading }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  function mapCartProductsToItems(products) {
    return (
      products &&
      products.map((p) => (
        <Item key={p.product._id}>
          <Item.Image>
            <ImagesSlider imageUrls={p.product.mediaUrls} />
          </Item.Image>
          <Item.Content verticalAlign="middle">
            <Item.Header
              as="a"
              onClick={() => router.push(`/${p.product._id}`)}
            >
              {p.product.name}
            </Item.Header>
            <Item.Meta>
              <span className="price">${p.product.price}</span>
            </Item.Meta>
            <Item.Description>{p.product.description}</Item.Description>
            <Item.Extra>
              <Label as="a">
                <Image
                  avatar
                  spaced="right"
                  size="small"
                  src={p.product.user.profilePictureUrl}
                />
                {p.product.user.name}
              </Label>

              <Button
                basic
                compact
                icon="remove"
                floated="right"
                onClick={() => handleRemoveFromSaved(p.product._id)}
              />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <Skeleton height={150} width={150} />
        </div>
        <div
          style={{
            fontSize: 20,
            lineHeight: 2,
            width: '100%',
            marginLeft: '1em',
          }}
        >
          <Skeleton count={4} />
        </div>
      </div>
    );
  }

  // if (success) {
  //   return (
  //     <Message
  //       success
  //       header="Success!"
  //       content="Your order and payment has been accepted"
  //       icon="star outline"
  //     />
  //   );
  // }

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
  return <Item.Group>{mapCartProductsToItems(products)}</Item.Group>;
}

export default SavedItemList;
