import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const SaveSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  products: [
    {
      product: {
        type: ObjectId,
        ref: 'Product',
      },
    },
  ],
});

export default mongoose.models.Save || mongoose.model('Save', SaveSchema);
