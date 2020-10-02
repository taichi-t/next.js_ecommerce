import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import useSWR from 'swr';

export default function useUsers() {
  async function getUsers(url) {
    const token = cookie.get('token');
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    return response.data;
  }
  const { data: users, error } = useSWR(`${baseUrl}/api/users`, getUsers);

  let loading = !users && !error;
  return { users, error, loading };
}
