import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import useSWR from 'swr';

export default function useCartProducts() {
  async function getCartProducts(url) {
    const token = cookie.get('token');
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    return response.data;
  }
  const { data: products, error, mutate } = useSWR(
    `${baseUrl}/api/cart`,
    getCartProducts
  );

  let loading = !products && !error;

  return { products, error, loading, mutate };
}
