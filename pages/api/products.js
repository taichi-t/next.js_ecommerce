import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const { page, size } = req.query;
  const pageNum = Number(page);
  const pageSize = Number(size);

  let products = [];
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
  const query = [
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },

    { $unwind: '$user' },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'product',
        as: 'commentCounter',
      },
    },
    { $unwind: '$commentCounter' },
    {
      $addFields: {
        commentCounter: { $size: '$commentCounter.comments' },
      },
    },

    {
      $project: {
        user: {
          _id: 0,
          role: 0,
          invitationCodeVerified: 0,
          email: 0,
          password: 0,
          updatedAt: 0,
        },
      },
    },
  ];
  if (pageNum === 1) {
    products = await Product.aggregate(query).limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.aggregate(query).skip(skips).limit(pageSize);
  }
  return res.status(200).json({ products, totalPages });
};
