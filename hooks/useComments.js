import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import useSWR from 'swr';

export default function useComments(productId) {
  async function getComments(url, productId) {
    const payload = { params: { productId } };
    const response = await axios.get(url, payload);
    if (!response.data.length || !response.data) {
      return {};
    } else {
      return response.data[0];
    }
  }
  const { data, error, mutate } = useSWR(
    [`${baseUrl}/api/comment`, productId],
    getComments,
    { shouldRetryOnError: false }
  );

  let loading = !data && !error;

  return {
    data,
    error,
    loading,
    mutate,
  };
}
