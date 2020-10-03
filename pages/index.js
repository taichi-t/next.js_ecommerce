import React, { useContext } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import ProductPagination from '../components/Index/ProductPagination';
import baseUrl from '../utils/baseUrl';
import getProducts from '../utils/getProducts';

const size = 9;
const url = `${baseUrl}/api/products`;

function Home({ products, totalPages, page }) {
  const { data, error } = useSWR([url, size, page], getProducts, {
    initialData: { products, totalPages },
  });
  const { products: _products, totalPages: _totalPages } = data;

  return (
    <>
      <ProductList products={_products} />
      <ProductPagination totalPages={_totalPages} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const page = ctx.query.page ? ctx.query.page : '1';
  const response = await getProducts(url, size, page);

  return {
    props: {
      products: response.products,
      totalPages: response.totalPages,
      page: page,
    },
  };
}

export default Home;
