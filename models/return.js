import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema(
  {
    ref: {
      type: String,
      trim: true,
    },
    operator: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
    return_quantity: {
      type: mongoose.Schema.Types.Decimal128,
      trim: true,
    },
    narration: {
      type: String,
      trim: true,
    },
    return_status: {
      type: String,
      trim: true,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Return = mongoose.model('Return', returnSchema);

export { Return };
