import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import router from 'next/router';
import { useEffect } from 'react';
export default function useUser() {
  const [user, setUser] = useState();
  const token = cookie.get('token');
  useEffect(() => {
    async function getUserData() {
      const payload = { headers: { Authorization: token } };
      const response = await axios.get(`${baseUrl}/api/account`, payload);
      setUser(response.data);
    }
    getUserData();
  }, []);

  return { user };
  // if (!token) {
  //   const isProtectedRoute =
  //     router.pathname === '/account' ||
  //     router.pathname === '/create' ||
  //     router.pathname === '/cart';
  //   if (isProtectedRoute) {
  //     redirectUser(ctx, '/login');
  //   }
  // }
}
