import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import useSWR from 'swr';
import cookie from 'js-cookie';

export default function useListing() {
  async function getListing(url) {
    const token = cookie.get('token');
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.get(url, headers);
    return response;
  }
  const { data, error, mutate } = useSWR(`${baseUrl}/api/listing`, getListing);

  let loading = !data;

  return {
    data,
    error,
    loading,
    mutate,
  };
}
