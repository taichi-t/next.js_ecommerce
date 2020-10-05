import { Item, Label } from 'semantic-ui-react';
import AddProductToCart from '../Product/AddProductToCart';
import ImagesSlider from '../Slider/ImagesSlider';

function ProductSummary({ user, product }) {
  const { name, mediaUrls, _id, price, sku } = product;
  return (
    <Item.Group>
      <Item>
        {/* <Item.Image size="medium" src={mediaUrls && mediaUrls[0]} /> */}
        <Item.Image size="medium">
          <ImagesSlider imageUrls={mediaUrls} />
        </Item.Image>
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
