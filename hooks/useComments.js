import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import useSWR from 'swr';

export default function useComments(productId) {
  async function getComments(url) {
    const payload = { params: { productId } };
    const response = await axios.get(url, payload);
    console.log(response.data);
    return response.data;
  }
  const { data, error, mutate } = useSWR(`${baseUrl}/api/comment`, getComments);

  let loading = !data && !error;

  return {
    data,
    error,
    loading,
    mutate,
  };
}
