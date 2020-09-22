import { useState, useRef } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import { useEffect } from 'react';

export default function useUser(pathname) {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [loading, setLoding] = useState(false);
  const token = cookie.get('token');
  useEffect(() => {
    async function getUserData() {
      if (!token) return setUser({});
      if (pathname === '/logout') return setUser({});
      try {
        setLoding(true);
        const payload = { headers: { Authorization: token } };
        const response = await axios.get(`${baseUrl}/api/account`, payload);
        setUser(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoding(false);
      }
    }
    getUserData();
  }, [pathname]);

  return { user, token, error, loading };
}
