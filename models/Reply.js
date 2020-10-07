import mongoose from 'mongoose';

const { ObjectId, String } = mongoose.Schema.Types;

const ReplySchema = new mongoose.Schema(
  {
    comments: {
      type: ObjectId,
      ref: 'Comments',
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Reply || mongoose.model('Reply', ReplySchema);
