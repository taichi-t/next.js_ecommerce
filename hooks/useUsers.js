import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoding(true);
        const url = `${baseUrl}/api/users`;
        const token = cookie.get('token');
        const payload = { headers: { Authorization: token } };
        const response = await axios.get(url, payload);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoding(false);
      }
    }
    getUsers();
  }, []);
  return { users, error, loading };
}
