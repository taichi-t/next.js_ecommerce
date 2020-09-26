import React from 'react';
import Layout from '../components/_App/Layout';
import cookie from 'js-cookie';
import useUser from '../hooks/useUser';
import UserContextProvider from '../utils/UserProvider';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { user, error, loading, token } = useUser();

  if (process.browser) {
    if (!token) {
      const isProtectedRoute =
        router.pathname === '/account' ||
        router.pathname === '/create' ||
        router.pathname === '/cart';
      if (isProtectedRoute) {
        router.push('/login');
      }
    }
    const isRoot = user.role === 'root';
    const isAdmin = user.role === 'admin';
    //if authenticated, but not of role "admin" or "root", redirect from "/create" page
    const isNotPermitted =
      !(isRoot || isAdmin) && router.pathname === '/create';
    if (isNotPermitted) {
      router.push('/');
    }
    if (error) {
      console.error('Error getting current user', error);
      // 1) Throw out invalid token
      cookie.remove('token');
      // 2) Redirect to login
      router.push('/login');
    }
  }

  React.useEffect(() => {
    window.addEventListener('storage', syncLogout);
  }, []);
  const syncLogout = (e) => {
    if (e.key === 'logout') {
      router.push('/login');
    }
  };
  return (
    <UserContextProvider
      user={user}
      error={error}
      loading={loading}
      token={token}
    >
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}

export default MyApp;
