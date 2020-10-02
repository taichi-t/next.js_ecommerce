import React from 'react';
import { Segment } from 'semantic-ui-react';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import catchErrors from '../utils/catchErrors';
import useCartProducts from '../hooks/useCartProducts';

function Cart() {
  const { products, loading: cartProductsLoading, mutate } = useCartProducts();

  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleRemoveFromCart(productId) {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token');
    const payload = {
      params: { productId },
      headers: { Authorization: token },
    };
    const response = await axios.delete(url, payload);
    mutate(response.data);
  }

  async function handleCheckout(paymentData) {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get('token');
      const payload = { paymentData };
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment loading={loading}>
      <CartItemList
        products={products}
        handleRemoveFromCart={handleRemoveFromCart}
        success={success}
        loading={cartProductsLoading}
      />
      <CartSummary
        products={products}
        handleCheckout={handleCheckout}
        success={success}
        loading={cartProductsLoading}
      />
    </Segment>
  );
}

export default Cart;
