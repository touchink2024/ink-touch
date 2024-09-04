import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // I want to prevent password from being returned by default
    },
    phone_number: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v, 'any');
        },
        message: 'Please provide a valid phone number',
      },
    },

    isVerified: { type: Boolean, default: false },
    verificationToken: {
      token: { type: String, default: null },
      expires: { type: Date, default: null },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to check if entered password matches the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export { User };
