import { Card, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map((product) => (
      <Card key={product._id} fluid color="teal">
        <Image src={product.mediaUrls[0]} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            <Link href={`/products/[id]`} as={`/products/${product._id}`}>
              <a>{product.name}</a>
            </Link>
          </Card.Header>
          <Card.Meta>${product.price}</Card.Meta>
        </Card.Content>
      </Card>
    ));
  }
  return (
    <Card.Group itemsPerRow="3" stackable centered>
      {mapProductsToItems(products)}
    </Card.Group>
  );
}

export default ProductList;
