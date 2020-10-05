import { useContext } from 'react';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import getProductPaths from '../utils/getProductPaths';
import getProduct from '../utils/getProduct';
import { UserContext } from '../utils/UserProvider';

function Product({ product }) {
  const { user } = useContext(UserContext);
  return (
    <>
      <ProductSummary user={user} product={product && product[0]} />
      <ProductAttributes user={user} product={product && product[0]} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getProductPaths();
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const product = await getProduct(id);
  console.log(product);
  return {
    props: {
      product,
    },
  };
}

export default Product;
