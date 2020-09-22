import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import { useEffect } from 'react';

export default function useUser(pathname) {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const token = cookie.get('token');

  useEffect(() => {
    async function getUserData() {
      try {
        const payload = { headers: { Authorization: token } };
        const response = await axios.get(`${baseUrl}/api/account`, payload);
        setUser(response.data);
      } catch (error) {
        setError(error);
      }
    }
    if (!token) return setUser({});
    if (pathname === ('/' || '/login')) return;
    if (pathname === '/logout') return setUser({});
    getUserData();
  }, [pathname]);

  return { user, token, error };
}
