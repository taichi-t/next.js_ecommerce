import axios from 'axios';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';

import baseUrl from '../utils/baseUrl';

function Product({ product, user }) {
  return (
    <>
      <ProductSummary user={user} {...product} />
      <ProductAttributes user={user} {...product} />
    </>
  );
}

export const getStaticPaths = async () => {
  const url = `${baseUrl}/api/productPaths`;
  const response = await axios.get(url);
  return {
    paths: response.data,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const url = `${baseUrl}/api/product`;
  const payload = { params: { id } };
  const response = await axios.get(url, payload);
  const product = response.data;
  return {
    props: {
      product,
    },
  };
};

export default Product;
