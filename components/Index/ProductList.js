import { Card, Image, Icon, Divider } from 'semantic-ui-react';
import formatDateFromNow from '../../utils/formatDateFromNow';
import Link from 'next/link';

function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map((product) => {
      return (
        <Card key={product._id} ui color="teal">
          <Card.Content>
            <Card.Meta className="right floated">
              posted {formatDateFromNow(product.createdAt)}
            </Card.Meta>
            <Image src={product.user.profilePictureUrl} avatar ui />
            {product.user.name}
          </Card.Content>
          <Image src={product.mediaUrls[0]} />
          <Card.Content>
            <Card.Header>
              <Link href={`/[id]`} as={`/${product._id}`}>
                <a>{product.name}</a>
              </Link>
            </Card.Header>
            <Card.Meta>${product.price}</Card.Meta>
          </Card.Content>

          {/* <Image src={product.mediaUrls[0]} />
          <Card.Content>
            <Card.Header>
              <Link href={`/[id]`} as={`/${product._id}`}>
                <a>{product.name}</a>
              </Link>
            </Card.Header>
            <Card.Meta>${product.price}</Card.Meta>
            <Card.Description>{product.description}</Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="right">
            <Image src={product.user.profilePictureUrl} avatar />
            {product.user.name}
          </Card.Content> */}
        </Card>
      );
    });
  }
  return (
    <Card.Group itemsPerRow="2" stackable centered>
      {mapProductsToItems(products)}
    </Card.Group>
  );
}

export default ProductList;
