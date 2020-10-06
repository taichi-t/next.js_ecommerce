import mongoose from 'mongoose';

const { ObjectId, Number, String } = mongoose.Schema.Types;

const CommentsSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  commnets: [
    {
      user: {
        type: ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
      },
    },
  ],
});

export default mongoose.models.Comments ||
  mongoose.model('Comments', CommentsSchema);
