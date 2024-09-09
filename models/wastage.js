import mongoose from 'mongoose';

const wastageSchema = new mongoose.Schema(
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
    material: {
      type: String,
      trim: true,
    },
    waste_quantity: {
      type: Number,
      trim: true,
    },
    narration: {
      type: String,
      trim: true,
    },
    waste_status: {
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

const Wastage = mongoose.model('Wastage', wastageSchema);

export { Wastage };
