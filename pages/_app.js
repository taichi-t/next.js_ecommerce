import React, { useEffect } from 'react';
import Layout from '../components/_App/Layout';
import useUser from '../hooks/useUser';
import cookie from 'js-cookie';
import Router from 'next/router';

function MyApp({ Component, pageProps, router: { pathname } }) {
  const { user, token, error } = useUser(pathname);

  useEffect(() => {
    if (!token) {
      const isProtectedRoute =
        pathname === '/account' ||
        pathname === '/create' ||
        pathname === '/cart';
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
    if (error) {
      console.error('Error getting current user', error);
      // 1) Throw out invalid token
      cookie.remove('token');
      // 2) Redirect to login
      Router.push('/login');
    }
  }, [pathname]);

  pageProps.user = user;
  React.useEffect(() => {
    window.addEventListener('storage', syncLogout);
  }, []);
  const syncLogout = (e) => {
    if (e.key === 'logout') {
      router.push('/login');
    }
  };
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
