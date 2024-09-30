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
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', function (next) {
  if (this.category) {
    this.category = this.category.toLowerCase();
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export { Product };
