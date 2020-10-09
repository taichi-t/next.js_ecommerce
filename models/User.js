import mongoose from 'mongoose';
const { String, Boolean } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin', 'root'],
    },
    invitationCodeVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePictureUrl: {
      type: String,
      default: '/images/anonymous-user.png',
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
