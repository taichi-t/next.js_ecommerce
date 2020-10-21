import { useContext } from 'react';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import getProductPaths from '../utils/getProductPaths';
import { UserContext } from '../utils/UserProvider';
import { useRouter } from 'next/router';
import CommentsContainer from '../components/Comments/CommentsContainer';
import useSWR from 'swr';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import gerProduct from '../utils/getProduct';
import { Container } from 'semantic-ui-react';

const url = `${baseUrl}/api/product`;

const fetcher = async (url, id) => {
  const response = await axios.get(url, { params: { id } });
  return response.data;
};

function Product({ initialData, id }) {
  const { user } = useContext(UserContext);
  const { data: product, error, mutate } = useSWR([url, id], fetcher, {
    initialData,
  });

  const router = useRouter();

  return router.isFallback ? (
    <Container text>
      <p>Loading</p>
    </Container>
  ) : (
    <Container text style={{ paddingTop: '1em' }}>
      <ProductSummary user={user} product={product} mutate={mutate} />
      <ProductAttributes user={user} product={product} />
      <CommentsContainer productId={product._id} />
    </Container>
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
  const response = await gerProduct(id);

  return {
    props: {
      initialData: response,
      id,
    },
  };
}

export default Product;
