import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useUser() {
  // const router = useRouter();
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
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
    getUserData();
  }, []);

  // if (!token) {
  //   const isProtectedRoute =
  //     router.pathname === '/account' ||
  //     router.pathname === '/create' ||
  //     router.pathname === '/cart';
  //   if (isProtectedRoute) {
  //     router.push('/login');
  //   }
  // }
  // const isRoot = user.role === 'root';
  // const isAdmin = user.role === 'admin';
  // //if authenticated, but not of role "admin" or "root", redirect from "/create" page
  // const isNotPermitted = !(isRoot || isAdmin) && router.pathname === '/create';
  // if (isNotPermitted) {
  //   router.push('/');
  // }
  // if (error) {
  //   console.error('Error getting current user', error);
  //   // 1) Throw out invalid token
  //   cookie.remove('token');
  //   // 2) Redirect to login
  //   router.push('login');
  // }
  return { user };
}
