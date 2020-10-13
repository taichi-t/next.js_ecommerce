import mongoose from 'mongoose';

const { String, Number, ObjectId } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    medias: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],
    wantCounter: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
