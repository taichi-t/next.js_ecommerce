import { Button, Segment, Divider } from 'semantic-ui-react';
import StripeCheckout from 'react-stripe-checkout';
import calculateCartTotal from '../../utils/calculateCartTotal';
import Skeleton from 'react-loading-skeleton';

function CartSummary({ products, handleCheckout, success, loading }) {
  const [isCartEmpty, setCartEmpty] = React.useState(false);
  const [stripeAmount, seStripeAmnount] = React.useState(0);
  const [cartAmount, setCartAmount] = React.useState(0);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    seStripeAmnount(stripeTotal);
    setCartEmpty(products && products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <strong>Sub total:</strong>${cartAmount}
            <StripeCheckout
              name="React Reserve"
              amount={stripeAmount}
              image={products.length > 0 ? products[0].product.mediaUrl : ''}
              currency="USD"
              shippingAddress={true}
              stripeKey="pk_test_51HOI2hDgNacxWkqpQDEKSB1H4OQIS5hUSWl2yzCkL4cutMeYRjKU7ndn0RG5ctVzMxhZRgQuPNcTlSTOh9KROS3h00OZdq9WrL"
              billingAddress={true}
              zipCode={true}
              token={handleCheckout}
              triggerEvent="onClick"
            >
              <Button
                icon="cart"
                color="teal"
                floated="right"
                content="Checkout"
                disabled={isCartEmpty || success}
              />
            </StripeCheckout>
          </>
        )}
      </Segment>
    </>
  );
}

export default CartSummary;
