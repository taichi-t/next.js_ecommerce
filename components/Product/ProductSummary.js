import { Item, Label } from 'semantic-ui-react';
import AddProductToCart from '../Product/AddProductToCart';
function ProductSummary({ name, mediaUrls, _id, price, sku, user }) {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaUrls[0]} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>${price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart productId={_id} user={user} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;
