import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { config } from '../configs/index.js';
import { Conflict, HttpError } from '../middlewares/index.js';
import { User } from '../models/index.js';
import { sendMail, generateOTP } from '../utils/index.js';
import { asyncHandler } from '../helper/index.js';
import {
  signUpSchema,
  resetPasswordSchema,
  loginSchema,
} from '../schema/index.js';
import {
  sanitizeInput,
  sanitizeObject,
  verifyEmailOtp,
  welcomeEmail,
  forgetPasswordEmail,
  resetPasswordEmail,
  loginEmail,
} from '../utils/index.js';

export const signUp = (req, res) => {
  res.render('auth/register');
};

export const signUpPost = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = signUpSchema.validate(sanitizedBody, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const { email, name, password } = value;
  const user = await User.findOne({ email: email });
  if (user) {
    if (user.email === email) {
      throw new Conflict('Email already exists');
    }
  }

  const { otp, hashedOTP } = await generateOTP();
  const newUser = new User({
    email,
    name,
    password,
    verificationCode: hashedOTP,
  });

  await newUser.save();

  const otpExpiryHours = 24;
  const emailContent = verifyEmailOtp(newUser, otp, otpExpiryHours);
  await sendMail(emailContent);

  req.session.tempEmail = email;

  const redirectUrl = `/auth/verify-email`;
  req.session.msg = 'Registration successful. Please verify your email';
  res.status(200).json({
    redirectUrl,
    success: true,
    message: 'Registration successful. Please verify your email',
  });
});

export const verifyEmail = (req, res) => {
  const msg = req.session.msg;
  req.session.msg = null;
  res.render('auth/verify-email', { msg });
};

export const verifyEmailPost = asyncHandler(async (req, res) => {
  const { inputOTP } = req.body;

  const email = req.session.tempEmail;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: 'Session expired or email not found' });
  }

  const user = await User.findOne({ email });
  if (!user || !user.verificationCode) {
    return res
      .status(404)
      .json({ success: false, message: 'No OTP found or user not found' });
  }

  const isMatch = await bcrypt.compare(inputOTP, user.verificationCode);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  const otpCreationDate = user.createdAt;
  const otpExpiry = new Date(otpCreationDate.getTime() + 24 * 60 * 60 * 1000);

  if (new Date() > otpExpiry) {
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  req.session.tempEmail = null;

  const emailContent = welcomeEmail(user);
  await sendMail(emailContent);

  req.session.message = 'Email verification successful!';
  res.status(200).json({
    success: true,
    message: 'Email verification successful!',
    redirectUrl: '/auth/login',
  });
});

export const forgetPassword = (req, res) => {
  res.render('auth/forget-password');
};

export const forgetPasswordPost = asyncHandler(async (req, res) => {
  const email = sanitizeInput(req.body.email);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: [{ key: 'email', msg: 'Email not found' }],
    });
  }

  const resetToken = user.getResetPasswordToken();
  await user.save();

  const resetLink = `${
    config.baseUrl || 'http://localhost:8080'
  }/auth/reset-password/${resetToken}`;

  const emailContent = forgetPasswordEmail(user, resetLink);

  await sendMail(emailContent);

  req.session.successMessage =
    'A password reset link has been sent to your email';

  return res.status(200).json({
    success: true,
    message: 'A password reset link has been sent to your email',
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;

  const hashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedResetToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new HttpError(400, 'Invalid or expired token.');
  }

  res.render('auth/reset-password', { user });
});

export const resetPasswordPost = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = resetPasswordSchema.validate(sanitizedBody, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const { password } = value;
  const { resetToken } = req.params;

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters.',
    });
  }

  const hashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedResetToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid or expired reset token.' });
  }

  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  const emailContent = resetPasswordEmail(user);
  await sendMail(emailContent);

  req.session.msge = 'Password reset successfully. Please log in';
  const redirectUrl = `/auth/login`;
  return res.status(200).json({
    redirectUrl,
    success: true,
    msge: 'Password reset successfully. Please log in.',
  });
});

export const login = (req, res) => {
  const errorMessage = req.session.authErrorMessage;
  const message = req.session.message;
  const msge = req.session.msge;
  req.session.message = null;
  req.session.msge = null;
  req.session.errorMessage = null;
  res.render('auth/login', { message, msge, errorMessage });
};

export const loginPost = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = loginSchema.validate(sanitizedBody, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const { email, password } = value;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Incorrect email or password.',
    });
  }

  const isPasswordValid = await user.matchPassword(password);
  if (!isPasswordValid) {
    user.failedLoginAttempts += 1;
    await user.save();

    if (user.failedLoginAttempts >= config.maxFailedAttempt) {
      user.accountLocked = true;
      await user.save();
      return res.status(423).json({
        success: false,
        message: 'Account locked. Contact support.',
      });
    }

    return res.status(401).json({
      success: false,
      message: `Invalid credentials. ${
        config.maxFailedAttempt - user.failedLoginAttempts
      } attempt(s) left.`,
    });
  }

  if (user.accountLocked || user.accountStatus === 'Locked') {
    return res.status(423).json({
      success: false,
      message: 'Your account is locked. Contact support.',
    });
  }

  user.failedLoginAttempts = 0;
  await user.save();

  if (!user.isVerified) {
    return res.status(412).json({
      success: false,
      message: 'Kindly verify your email before login.',
    });
  }

  // Successful PIN verification
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: config.accessTokenExpireTime }
  );
  req.session.accessToken = accessToken;

  let redirectUrl = user.role === 'Admin' ? '/admin/index' : '/user/index';

  const emailContent = loginEmail(user);
  await sendMail(emailContent);

  return res.json({
    success: true,
    redirectUrl,
    user: { id: user.id, email: user.email, role: user.role },
    accessToken,
    message: 'Login successful',
  });
});
