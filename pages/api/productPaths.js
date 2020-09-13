import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const products = await Product.find({}, { _id: 1 }).limit(9);
  const paths = products.map((product) => {
    const { _id } = product;
    return {
      params: {
        id: _id.toString(),
      },
    };
  });

  res.status(200).json(paths);
};
