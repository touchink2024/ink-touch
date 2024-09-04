import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';
import { Conflict, HttpError } from '../middlewares/index.js';
import { User } from '../models/index.js';
// import { comparePassword, hashPassword } from '../utils/index.js';
import { sendMail } from '../utils/index.js';
import { asyncHandler, sendJsonResponse } from '../helper/index.js';

export const signUp = (req, res) => {
  res.render('auth/register');
};

export const signUpPost = asyncHandler(async (req, res) => {
  const {} = req.body;
  const user = await User.findOne({
    $or: [{ email: value.email }, { username: value.username }],
  });

  if (admin) {
    if (admin.email === value.email) {
      throw new HttpError('Email already registered', 409);
    }
    if (admin.username === value.username) {
      throw new HttpError('Username already registered', 409);
    }
  }
  const { firstName, lastName, email, username, number, password } = value;

  const newUser = new User({
    firstName,
    lastName,
    email,
    username,
    number,
    password,
    date_added: Date.now(),
  });

  await newUser.save();
  const redirectUrl = `/auth/admin/login`;
  res
    .status(201)
    .json({ redirectUrl, success: true, message: 'Registeration successful' });
});

export const forgetPassword = (req, res) => {
  res.render('auth/forgetPassword');
};

export const forgetPasswordPost = (req, res) => {
  res.render('auth/forgetPassword');
};

export const resetPassword = (req, res) => {
  res.render('auth/resetPassword');
};

export const resetPasswordPost = (req, res) => {
  res.render('auth/resetPasswordPost');
};

export const login = (req, res) => {
  res.render('auth/login');
};
export const loginPost = (req, res) => {
  res.render('auth/loginPost');
};

// export const verifyOtp = asyncHandler(async (req, res) => {
//   const { otp, token } = req.body;
//   const { message } = await authService.verifyEmail(token, otp);
//   sendJsonResponse(res, 200, message);
// });

// export const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const { access_token, user } = await authService.login({ email, password });
//   sendJsonResponse(res, 200, 'Login successful', user, access_token);
// });

// export const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { message } = await authService.forgotPassword(email);
//   sendJsonResponse(res, 200, message);
// });

// export const resetPassword = asyncHandler(async (req, res) => {
//   const token = req.query.token;
//   const { new_password, confirm_password } = req.body;
//   const { message } = await authService.resetPassword(
//     token,
//     new_password,
//     confirm_password
//   );
//   sendJsonResponse(res, 200, message);
// });
