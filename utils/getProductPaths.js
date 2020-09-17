import Product from '../models/Product';
import connectDb from '../utils/connectDb';

connectDb();

export default async function getProductPaths() {
  let paths = [];
  try {
    const products = await Product.find({}, { _id: 1 }).limit(9);
    paths = await products.map((product) => {
      const { _id } = product;
      return {
        params: {
          id: _id.toString(),
        },
      };
    });
    return paths;
  } catch (error) {
    console.error(error);
    return paths;
  }
}
