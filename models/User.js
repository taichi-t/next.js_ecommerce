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
      default: 'admin',
      enum: ['user', 'admin', 'root'],
    },
    invitationCodeVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePicture: {
      url: {
        type: String,
        default: '/images/anonymous-user.png',
      },
      publicId: {
        type: String,
      },
    },
    twitter: {
      type: String,
      select: false,
    },
    instagram: {
      type: String,
      select: false,
    },
    contactEmail: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
