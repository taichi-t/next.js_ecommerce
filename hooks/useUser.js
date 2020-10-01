import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import Router from 'next/router';

export default function useUser() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [loading, setLoding] = useState(false);

  async function getUserData(token) {
    try {
      setLoding(true);
      const payload = { headers: { Authorization: token } };
      const response = await axios.get(`${baseUrl}/api/account`, payload);
      setUser(response.data);
    } catch (error) {
      console.error('Error getting current user', error);
      // 1) Throw out invalid token
      cookie.remove('token');
      // 2) Redirect to login
      Router.push('/login');
      setError(error);
    } finally {
      setLoding(false);
    }
  }

  useEffect(() => {
    async function cdm() {
      const token = cookie.get('token');
      if (Router.pathname !== ('/login' || '/singup' || '/') && token) {
        await getUserData(token);
      }
    }
    cdm();
  }, []);

  function handleLogout() {
    cookie.remove('token');
    localStorage.setItem('logout', Date.now());
    Router.push('/login');
    setUser({});
  }

  async function handleLogin(token) {
    cookie.set('token', token);
    await getUserData(token);
    Router.push('/account');
  }

  return {
    user,
    error,
    loading,
    setUser,
    handleLogout,
    handleLogin,
  };
}
