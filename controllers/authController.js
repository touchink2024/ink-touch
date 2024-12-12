import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../configs/index.js';
import { Conflict, HttpError } from '../middlewares/index.js';
import { User } from '../models/index.js';
import { asyncHandler } from '../helper/index.js';
import {
  signUpSchema,
  resetPasswordSchema,
  loginSchema,
} from '../schema/index.js';
import {
  sendMail,
  sanitizeInput,
  sanitizeObject,
  awaitingVerifyEmail,
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

  const newUser = new User({
    email,
    name,
    password,
    isVerified: false,
  });
  await newUser.save();

  const emailContent = awaitingVerifyEmail(newUser);
  await sendMail(emailContent);

  const redirectUrl = `/auth/login`;
  req.session.msg =
    'Registration successful. Kindly contact admin to verify your email';
  res.status(200).json({
    redirectUrl,
    success: true,
    message: 'Registration successful. ',
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
    process.env.PROD_BASE_URL || 'http://localhost:8080'
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
  const msg = req.session.msg;
  req.session.message = null;
  req.session.errorMessage = null;
  req.session.msg = null;
  res.render('auth/login', { message, msg, errorMessage });
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

    if (user.failedLoginAttempts >= config.maxFailedAttempt) {
      user.accountLocked = true;
      user.accountStatus = 'Locked';
      await user.save();

      return res.status(423).json({
        success: false,
        message: 'Account locked. Contact support.',
      });
    }

    await user.save();
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
      message: 'Verify your account with admin before login.',
    });
  }

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    config.accessToken,
    { expiresIn: '24h' }
  );

  // Fixed: Changed 'token' to 'accessToken'
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });

  req.session.accessToken = accessToken;

  let redirectUrl =
    user.role === 'Admin' || user.role === 'Super_Admin'
      ? '/admin/index'
      : '/user/index';

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

// export const loginPost = asyncHandler(async (req, res) => {
//   const sanitizedBody = sanitizeObject(req.body);
//   const { error, value } = loginSchema.validate(sanitizedBody, {
//     abortEarly: false,
//   });

//   if (error) {
//     const errors = error.details.map((err) => ({
//       key: err.path[0],
//       msg: err.message,
//     }));
//     return res.status(400).json({ success: false, errors });
//   }

//   const { email, password } = value;
//   const user = await User.findOne({ email }).select('+password');
//   if (!user) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid credentials. Incorrect email or password.',
//     });
//   }

//   const isPasswordValid = await user.matchPassword(password);
//   if (!isPasswordValid) {
//     user.failedLoginAttempts += 1;

//     if (user.failedLoginAttempts >= config.maxFailedAttempt) {
//       user.accountLocked = true;
//       user.accountStatus = 'Locked';
//       await user.save();

//       return res.status(423).json({
//         success: false,
//         message: 'Account locked. Contact support.',
//       });
//     }

//     await user.save();
//     return res.status(401).json({
//       success: false,
//       message: `Invalid credentials. ${
//         config.maxFailedAttempt - user.failedLoginAttempts
//       } attempt(s) left.`,
//     });
//   }

//   if (user.accountLocked || user.accountStatus === 'Locked') {
//     return res.status(423).json({
//       success: false,
//       message: 'Your account is locked. Contact support.',
//     });
//   }

//   user.failedLoginAttempts = 0;
//   await user.save();

//   if (!user.isVerified) {
//     return res.status(412).json({
//       success: false,
//       message: 'Verify your account with admin before login.',
//     });
//   }

//   const accessToken = jwt.sign(
//     { id: user._id, role: user.role },
//     config.accessToken,
//     { expiresIn: '24h' }
//   );

//   res.cookie('accessToken', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: 24 * 60 * 60 * 1000,
//   });

//   req.session.accessToken = accessToken;

//   let redirectUrl =
//     user.role === 'Admin' || user.role === 'Super_Admin'
//       ? '/admin/index'
//       : '/user/index';

//   const emailContent = loginEmail(user);
//   await sendMail(emailContent);

//   return res.json({
//     success: true,
//     redirectUrl,
//     user: { id: user.id, email: user.email, role: user.role },
//     accessToken,
//     message: 'Login successful',
//   });
// });
