import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import { useEffect } from 'react';

export default function useCartProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoding] = useState(false);
  const token = cookie.get('token');

  useEffect(() => {
    async function getCartData() {
      try {
        setLoding(true);
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/cart`;
        const response = await axios.get(url, payload);
        setProducts(response.data);
      } catch (error) {
        console.error("Error getting cart data'", error);
        setError(error);
      } finally {
        setLoding(false);
      }
    }
    getCartData();
  }, []);

  return { products, setProducts, error, loading };
}
