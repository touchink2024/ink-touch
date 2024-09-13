import mongoose from 'mongoose';

const requestProductSchema = new mongoose.Schema(
  {
    ref: {
      type: String,
      required: true,
      unique: true,
    },
    operator: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity_requested: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    narration: {
      type: String,
    },
    request_status: {
      type: String,
      trim: true,
      enum: ['Pending', 'Accepted', 'Declined'],
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

const RequestProduct = mongoose.model('RequestProduct', requestProductSchema);

export { RequestProduct };
