import mongoose from 'mongoose';
import shortid from 'shortid';
import beautifyUnique from 'mongoose-beautiful-unique-validation';

const { String, Number } = mongoose.Schema.Types;

const ProductsSchema = new mongoose.Schema({
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
  mediaUrls: {
    type: [String],
    required: true,
    default: [],
  },
});

ProductsSchema.plugin(beautifyUnique);

export default mongoose.models.Product ||
  mongoose.model('Product', ProductsSchema);
