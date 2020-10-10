import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import useSWR from 'swr';
import cookie from 'js-cookie';

export default function useProfile(sellerId) {
  async function getProfile(url, sellerId) {
    const token = cookie.get('token');
    if (!token) {
      throw new Error('No authorization token');
    }
    const response = await axios.get(url, {
      headers: { Authorization: token },
      params: { sellerId },
    });
    return response.data;
  }
  const { data, error } = useSWR(
    [`${baseUrl}/api/profile`, sellerId],
    getProfile
  );

  let loading = !data && !error;

  console.log(data);

  return {
    data,
    error,
    loading,
  };
}
