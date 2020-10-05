import { useContext, useReducer } from 'react';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import getProductPaths from '../utils/getProductPaths';
import getProduct from '../utils/getProduct';
import { UserContext } from '../utils/UserProvider';
import { useRouter } from 'next/router';

function Product({ product }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  return router.isFallback ? (
    <div>Loading</div>
  ) : (
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
  return {
    props: {
      product,
    },
  };
}

export default Product;
