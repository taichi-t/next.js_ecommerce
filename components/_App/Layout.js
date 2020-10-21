import Head from 'next/head';
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
