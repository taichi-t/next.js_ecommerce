import React from 'react';
import App from 'next/app';
import Layout from '../components/_App/Layout';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../utils/auth';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import Router from 'next/router';
// import { AuthProvider } from '../utils/AuthProvider';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.addEventListener('storage', syncLogout);
  }, []);
  const syncLogout = (e) => {
    if (e.key === 'logout') {
      Router.push('/login');
    }
  };
  return (
    // <AuthProvider userData={userData}>
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
    // </AuthProvider>
  );
}

// MyApp.getInitialProps = async ({ Component, ctx }) => {
//   const { token } = parseCookies(ctx);
//   let pageProps = {};
//   let userData = {};
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
//       userData = response.data;
//       const isRoot = userData.role === 'root';
//       const isAdmin = userData.role === 'admin';
//       //if authenticated, but not of role "admin" or "root", redirect from "/create" page
//       const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === '/create';
//       if (isNotPermitted) {
//         redirectUser(ctx, '/');
//       }
//     } catch (error) {
//       console.error('Error getting current user', error);
//       // 1) Throw out invalid token
//       destroyCookie(ctx, 'token');
//       // 2) Redirect to login
//       redirectUser(ctx, 'login');
//     }
//   }
//   return { pageProps, userData };
// };

export default MyApp;
