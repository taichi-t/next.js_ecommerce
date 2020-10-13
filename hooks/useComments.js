import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import useSWR from 'swr';

export default function useComments(productId) {
  async function getComments(url, productId) {
    const payload = { params: { productId } };
    const response = await axios.get(url, payload);
    return response;
  }
  const { data, error, mutate } = useSWR(
    [`${baseUrl}/api/comment`, productId],
    getComments
  );

  let loading = !data;

  return {
    data,
    error,
    loading,
    mutate,
  };
}
