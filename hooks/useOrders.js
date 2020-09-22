import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import { useEffect } from 'react';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const token = cookie.get('token');

  useEffect(() => {
    async function getOrdersData() {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/orders`;
        const response = await axios.get(url, payload);

        setOrders(response.data.orders);
      } catch (error) {
        setError(error);
      }
    }
    getOrdersData();
  }, []);
  return { orders, error };
}
