import React from 'react';
import App from 'next/app';
import Layout from '../components/_App/Layout';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../utils/auth';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
  //   const { token } = parseCookies(ctx);

  //   let pageProps = {};
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   if (!token) {
  //     const isProtectedRoute =
  //       ctx.pathname === '/account' ||
  //       ctx.pathname === '/create' ||
  //       ctx.pathname === '/cart';
  //     if (isProtectedRoute) {
  //       redirectUser(ctx, '/login');
  //     }
  //   } else {
  //     try {
  //       const payload = { headers: { Authorization: token } };
  //       const url = `${baseUrl}/api/account`;
  //       const response = await axios.get(url, payload);
  //       const user = response.data;
  //       const isRoot = user.role === 'root';
  //       const isAdmin = user.role === 'admin';
  //       //if authenticated, but not of role "admin" or "root", redirect from "/create" page
  //       const isNotPermitted =
  //         !(isRoot || isAdmin) && ctx.pathname === '/create';
  //       if (isNotPermitted) {
  //         redirectUser(ctx, '/');
  //       }
  //       pageProps.user = user;
  //     } catch (error) {
  //       console.error('Error getting current user', error);
  //       // 1) Throw out invalid token
  //       destroyCookie(ctx, 'token');
  //       // 2) Redirect to login
  //       redirectUser(ctx, 'login');
  //     }
  //   }
  //   return { pageProps };
  // }

  React.useEffect(() => {
    window.addEventListener('storage', syncLogout);
  }, []);
  // componentDidMount() {
  const syncLogout = (e) => {
    if (e.key === 'logout') {
      Router.push('/login');
    }
  };

  // }
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!token) {
    const isProtectedRoute =
      ctx.pathname === '/account' ||
      ctx.pathname === '/create' ||
      ctx.pathname === '/cart';
    if (isProtectedRoute) {
      redirectUser(ctx, '/login');
    }
  } else {
    try {
      const payload = { headers: { Authorization: token } };
      const url = `${baseUrl}/api/account`;
      const response = await axios.get(url, payload);
      const user = response.data;
      const isRoot = user.role === 'root';
      const isAdmin = user.role === 'admin';
      //if authenticated, but not of role "admin" or "root", redirect from "/create" page
      const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === '/create';
      if (isNotPermitted) {
        redirectUser(ctx, '/');
      }
      pageProps.user = user;
    } catch (error) {
      console.error('Error getting current user', error);
      // 1) Throw out invalid token
      destroyCookie(ctx, 'token');
      // 2) Redirect to login
      redirectUser(ctx, 'login');
    }
  }
  return { pageProps };
};

export default MyApp;
