import mongoose from 'mongoose';

const { String, ObjectId, Number } = mongoose.Schema.Types;

const InvitationSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    invitationCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
InvitationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.models.Invitation ||
  mongoose.model('Invitation', InvitationSchema);
