import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import ProductPagination from '../components/Index/ProductPagination';
import baseUrl from '../utils/baseUrl';

function Home({ products, totalPages }) {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const page = ctx.query.page ? ctx.query.page : '1';
  const size = 9;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return {
    props: {
      products: response.data.products,
      totalPages: response.data.totalPages,
    },
  };
}

export default Home;
