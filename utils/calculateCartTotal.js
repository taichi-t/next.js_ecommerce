export default function calculateCartTotal(products) {
  const total =
    products &&
    products.reduce((acc, el) => {
      acc += el.product.price;
      return acc;
    }, 0);
  const cartTotal = Number(((total * 100) / 100).toFixed(2));
  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
}
