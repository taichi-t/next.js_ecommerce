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
import fetch from 'node-fetch';

const url = `${baseUrl}/api/product`;

const fetcher = async (url, id) => {
  const { data } = await axios.get(url, { params: { id } });
  return data;
};

function Product({ product, id }) {
  // const { data, error, mutate } = useSWR([url, id], fetcher, {
  //   initialData: product,
  // });

  const router = useRouter();
  const { user } = useContext(UserContext);
  return router.isFallback ? (
    <div>Loading</div>
  ) : (
    <>
      <ProductSummary user={user} product={product} />
      <ProductAttributes user={user} product={product} />
      <CommentsContainer productId={product._id} />
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
  // const { data } = await axios.get(url, { params: { id } });
  // console.log('getStaticProps', data);
  const res = await fetch(`${url}?id=${id}`);
  const json = res.json();

  return {
    props: {
      product: json,
      id,
    },
  };
}

export default Product;
