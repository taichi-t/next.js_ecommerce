import mongoose from 'mongoose';

const { ObjectId, String } = mongoose.Schema.Types;

const CommentsSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  comments: [
    {
      user: {
        type: ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
      },
      createdAt: {
        type: String,
      },
    },
  ],
});

export default mongoose.models.Comments ||
  mongoose.model('Comments', CommentsSchema);
