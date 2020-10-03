import axios from 'axios';

export default async function getProducts(url, size, page) {
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
}
