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

      <Container text style={{ marginTop: '1em' }}>
        {children}
      </Container>
    </>
  );
}

export default Layout;
