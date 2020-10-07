import mongoose from 'mongoose';

const { ObjectId, String } = mongoose.Schema.Types;

const ReplySchema = new mongoose.Schema({
  comment: {
    type: ObjectId,
    ref: 'Comment',
  },
  replies: [
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

export default mongoose.models.Reply || mongoose.model('Reply', ReplySchema);
