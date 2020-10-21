import Head from 'next/head';

import { Container, Grid } from 'semantic-ui-react';
import Footer from './Footer';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Moving Sale</title>
      </Head>
      <Header />

      <div>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
