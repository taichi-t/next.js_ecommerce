import { Segment, Divider } from 'semantic-ui-react';
// import StripeCheckout from 'react-stripe-checkout';
import calculateCartTotal from '../../utils/calculateCartTotal';
import Skeleton from 'react-loading-skeleton';

function SavedItemsSummary({ products, loading }) {
  // const [isCartEmpty, setCartEmpty] = React.useState(false);
  // const [stripeAmount, seStripeAmnount] = React.useState(0);
  const [cartAmount, setCartAmount] = React.useState(0);

  React.useEffect(() => {
    const { cartTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    // seStripeAmnount(stripeTotal);
    // setCartEmpty(products && products.length === 0);
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
          </>
        )}
      </Segment>
    </>
  );
}

export default SavedItemsSummary;
