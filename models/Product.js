import mongoose from 'mongoose';
import beautifyUnique from 'mongoose-beautiful-unique-validation';

const { String, Number, ObjectId } = mongoose.Schema.Types;

const ProductsSchema = new mongoose.Schema(
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

ProductsSchema.plugin(beautifyUnique);

export default mongoose.models.Product ||
  mongoose.model('Product', ProductsSchema);
