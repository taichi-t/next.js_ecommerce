import { Card, Image, Icon, Divider, Label } from 'semantic-ui-react';
import formatDateFromNow from '../../utils/formatDateFromNow';
import ImagesSlider from '../Slider/ImagesSlider';
import Link from 'next/link';

function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map((product) => {
      return (
        <Card key={product._id} color="teal">
          <Card.Content>
            <Card.Meta className="right floated">
              {formatDateFromNow(product.createdAt)}
            </Card.Meta>
            <Image src={product.user.profilePictureUrl} avatar ui />
            {product.user.name}
          </Card.Content>

          <ImagesSlider imageUrls={product.mediaUrls} />
          <Card.Content>
            <Card.Header>
              <Link href={`/[id]`} as={`/${product._id}`}>
                <a>{product.name}</a>
              </Link>
            </Card.Header>
            <Card.Meta>${product.price}</Card.Meta>
          </Card.Content>
        </Card>
      );
    });
  }
  return (
    <Card.Group itemsPerRow="3" stackable centered>
      {mapProductsToItems(products)}
    </Card.Group>
  );
}

export default ProductList;
