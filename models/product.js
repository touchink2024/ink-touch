import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
    narration: {
      type: String,
      trim: true,
    },
    totalQuantity: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export { Product };
