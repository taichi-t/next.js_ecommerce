import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import { useEffect } from 'react';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const token = cookie.get('token');
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    async function getOrdersData() {
      try {
        setLoding(true);
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/orders`;
        const response = await axios.get(url, payload);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error getting orders', error);
        setError(error);
      } finally {
        setLoding(false);
      }
    }
    getOrdersData();
  }, []);
  return { orders, error, loading };
}
