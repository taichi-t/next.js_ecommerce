const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://moving-sale.vercel.app'
    : 'http://localhost:3000';

export default baseUrl;
