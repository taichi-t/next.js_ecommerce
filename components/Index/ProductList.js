import { Card, Image, Icon } from 'semantic-ui-react';
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
            <Image src={product.user.profilePicture.url} avatar ui />
            {product.user.name}
          </Card.Content>
          <ImagesSlider medias={product.medias} />
          <Card.Content>
            <span className="right floated">
              <Icon name="heart" color="red" size="large" />
              {product.wantCounter} wants
            </span>
            <span>
              <Icon name="comment" size="large" />
              {product.commentCounter} comments
            </span>
          </Card.Content>
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
    <Card.Group itemsPerRow="2" stackable centered>
      {mapProductsToItems(products)}
    </Card.Group>
  );
}

export default ProductList;
