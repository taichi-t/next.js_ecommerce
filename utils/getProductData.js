import Product from '../models/Product';
import connectDb from './connectDb';

connectDb();

export default async function getProductData(id) {
  try {
    const product = await Product.findOne({ _id: id });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error(error);
  }
}
