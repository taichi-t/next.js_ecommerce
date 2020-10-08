import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import useSWR from 'swr';

export default function useSavedProducts() {
  async function getSavedProducts(url) {
    const token = cookie.get('token');
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    return response.data;
  }
  const { data: products, error, mutate } = useSWR(
    `${baseUrl}/api/saved`,
    getSavedProducts
  );

  let loading = !products && !error;

  return { products, error, loading, mutate };
}
