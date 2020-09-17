const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://private-garage-sale.vercel.app'
    : 'http://localhost:3000';

export default baseUrl;
