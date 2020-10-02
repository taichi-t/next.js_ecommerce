import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import useSWR from 'swr';

export default function useOrders() {
  async function getOrdersData(url) {
    const token = cookie.get('token');
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    return response.data;
  }
  const { data: orders, error } = useSWR(
    `${baseUrl}/api/orders`,
    getOrdersData
  );
  let loading = !orders && !error;
  return { orders, error, loading };
}
