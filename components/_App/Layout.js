import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Moving Sale</title>
      </Head>
      <Header />

      <Container text style={{ padding: '1em 0' }}>
        {children}
      </Container>
    </>
  );
}

export default Layout;
