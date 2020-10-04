import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const { page, size } = req.query;
  const pageNum = Number(page);
  const pageSize = Number(size);
  const response = await Product.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
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

    { $unwind: '$user' },
  ]).limit(pageSize);
  let products = [];
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
  if (pageNum === 1) {
    products = await Product.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
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
      { $unwind: '$user' },
    ]).limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
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

      { $unwind: '$user' },
    ])
      .skip(skips)
      .limit(pageSize);
  }
  res.status(200).json({ products, totalPages });
};
