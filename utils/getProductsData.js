import Product from '../models/Product';
import connectDb from '../utils/connectDb';

connectDb();

export default async function getProductsData(page, size) {
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products = [];
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.find().skip(skips).limit(pageSize);
  }
  return JSON.parse(JSON.stringify({ products, totalPages }));
}
