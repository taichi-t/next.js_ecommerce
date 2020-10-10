import React, { useEffect } from 'react';
import Layout from '../components/_App/Layout';
import cookie from 'js-cookie';
import Router from 'next/router';
import useUser from '../hooks/useUser';
import UserContextProvider from '../utils/UserProvider';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../static/nprogress.css';
import 'semantic-ui-css/semantic.min.css';
import '../static/styles.css';

function MyApp({ Component, pageProps, router: { pathname } }) {
  useEffect(() => {
    window.addEventListener('storage', syncLogout);
    const token = cookie.get('token');
    if (!token) {
      const isProtectedRoute =
        pathname === '/account' || pathname === '/create';
      if (isProtectedRoute) {
        Router.push('/login');
      }
    }
    const isRoot = user.role === 'root';
    const isAdmin = user.role === 'admin';
    //if authenticated, but not of role "admin" or "root", redirect from "/create" page
    const isNotPermitted = !(isRoot || isAdmin) && pathname === '/create';
    if (isNotPermitted) {
      Router.push('/');
    }
  }, []);

  const {
    user,
    error,
    loading,
    setUser,
    handleLogout,
    handleLogin,
  } = useUser();

  const syncLogout = (e) => {
    if (e.key === 'logout') {
      router.push('/login');
    }
  };
  return (
    <UserContextProvider
      auth={{ setUser, loading, error, user, handleLogout, handleLogin }}
    >
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}

export default MyApp;
