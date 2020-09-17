import Product from '../models/Product';
import connectDb from '../utils/connectDb';

connectDb();

export default async function getProductPaths() {
  let paths = [];
  try {
    const products = await Product.find({}, { _id: 1 }).limit(9);
    const promises = await products.map(async (product) => {
      const { _id } = product;
      return {
        params: {
          id: _id.toString(),
        },
      };
    });
    paths = await Promise.all(promises);
    return paths;
  } catch (error) {
    console.error(error);
    return paths;
  }
}
