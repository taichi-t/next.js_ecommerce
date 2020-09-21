import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import getProductPaths from '../utils/getProductPaths';
import getProductData from '../utils/getProductData';
import { useAuth } from '../utils/AuthProvider';

function Product({ product }) {
  const { user } = useAuth();
  return (
    <>
      <ProductSummary user={user} {...product} />
      <ProductAttributes user={user} {...product} />
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
  const product = await getProductData(id);
  return {
    props: {
      product,
    },
  };
}

export default Product;
