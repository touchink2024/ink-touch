'use strict';
import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';
import { Conflict, HttpError } from '../middlewares/index.js';
import { User } from '../models/index.js';
import { sendMail } from '../utils/index.js';
import { asyncHandler } from '../helper/index.js';
import { productSchema, addUserSchema } from '../schema/index.js';
import {
  sanitizeInput,
  sanitizeObject,
  welcomeEmail,
  accountStatusMail,
} from '../utils/index.js';

export const adminIndex = (req, res) => {
  res.render('admin/index');
};

export const allUser = (req, res) => {
  const admin = req.currentAdmin;

  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/all-user', {
    admin,
    users: results,
    currentPage,
    totalPages,
  });
};

export const addUser = (req, res) => {
  res.render('admin/add-user');
};

export const addUserPost = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = addUserSchema.validate(sanitizedBody, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const { name, email, phone_number, address, city, state, password } = value;
  const user = await User.findOne({
    $or: [{ email: email }, { phone_number: phone_number }],
  });

  if (user) {
    if (user.email === email) {
      throw new Conflict('Email already exists');
    }
    if (user.phone_number === phone_number) {
      throw new Conflict('Number already registered', 409);
    }
  }

  const newUser = new User({
    name,
    email,
    phone_number,
    address,
    city,
    state,
    password,
  });

  await newUser.save();

  // Use the email template
  const emailContent = welcomeEmail(newUser);
  await sendMail(emailContent);

  const redirectUrl = `/admin/all-user`;
  res
    .status(200)
    .json({ redirectUrl, success: true, message: 'Registeration successful' });
});

export const updateAccountStatus = asyncHandler(async (req, res) => {
  const { userId, accountStatus } = req.body;
  const validStatuses = ['Active', 'Locked'];

  if (!validStatuses.includes(accountStatus)) {
    throw new HttpError(400, 'Invalid account status.');
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  user.accountStatus = accountStatus;
  await user.save();

  const emailContent = accountStatusMail(user);
  await sendMail(emailContent);

  res.status(200).json({ message: 'Account status updated successfully' });
});

export const viewUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({ success: true, userInfo: user });
});

export const editUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const editUserInfo = await User.findById(userId);
  if (!editUserInfo) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({ success: true, editUserInfo });
});

export const editUserPost = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const { name, email, phone_number, address, city, state, role } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name,
        email,
        phone_number,
        address,
        city,
        state,
        role,
      },
    },
    { new: true }
  );

  const redirectUrl = '/admin/all-user';
  res.status(201).json({
    user: updatedUser,
    redirectUrl,
    success: true,
    message: 'User successfully updated',
  });
});

export const addProduct = (req, res) => {
  res.render('admin/add-product');
};

export const addProductPost = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = productSchema.validate(sanitizedBody, {
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
});

export const allProduct = (req, res) => {
  res.render('admin/all-product');
};

export const allWastages = (req, res) => {
  res.render('admin/all-wastage');
};

export const allAdmin = (req, res) => {
  res.render('admin/all-admin');
};

export const addAdmin = (req, res) => {
  res.render('admin/add-admin');
};

export const requestProduct = (req, res) => {
  res.render('admin/request-product');
};

export const adminProfile = (req, res) => {
  res.render('admin/profile');
};
