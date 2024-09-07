'use strict';
import jwt from 'jsonwebtoken';
import { config, cloudinary } from '../configs/index.js';
import { Conflict, HttpError } from '../middlewares/index.js';
import { User, Product } from '../models/index.js';
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
  const user = req.currentUser;
  res.render('admin/index', { user });
};

export const uploadAdminImage = asyncHandler(async (req, res) => {
  const user = req.currentUser;

  const file = req.file;
  if (!file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded.',
    });
  }

  const cloudinaryResult = await cloudinary.uploader.upload(file.path);

  const image = {
    imageId: cloudinaryResult.public_id,
    imageUrl: cloudinaryResult.secure_url,
  };
  user.image = image;
  await user.save();
  const callbackUrl = '/admin/index';
  return res.status(200).json({
    callbackUrl,
    success: true,
    message: 'Image uploaded successfully',
  });
});

export const allUser = (req, res) => {
  const user = req.currentUser;

  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/all-user', {
    user,
    users: results,
    currentPage,
    totalPages,
  });
};

export const addUser = (req, res) => {
  const user = req.currentUser;
  res.render('admin/add-user', { user });
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

  const { name, email, phone_number, address, city, state, password, role } =
    value;
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
    role,
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

  if (!userId) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
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

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found or update failed',
    });
  }

  const redirectUrl = '/admin/all-user';
  res.status(201).json({
    user: updatedUser,
    redirectUrl,
    success: true,
    message: 'User successfully updated',
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const users = await User.findById(req.params.userId);
  if (!users) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  await User.findByIdAndDelete(req.params.userId);
  const redirectUrl = '/admin/all-user';
  res.status(201).json({
    redirectUrl,
    success: true,
    user,
    message: 'user deleted successfully',
  });
});

export const addProduct = (req, res) => {
  const user = req.currentUser;
  res.render('admin/add-product', { user });
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

  const { category, size, material, quantity, narration } = value;

  const existingProduct = await Product.findOne({
    category: category,
    size: size,
    material: material,
  });

  if (existingProduct) {
    throw new Conflict('Product already exists');
  }

  const newProduct = new Product({
    category,
    size,
    material,
    quantity,
    narration,
  });

  await newProduct.save();

  const redirectUrl = `/admin/all-product`;
  res
    .status(200)
    .json({ redirectUrl, success: true, message: 'Product added successful' });
});

export const allProduct = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/all-product', {
    user,
    product: results,
    currentPage,
    totalPages,
  });
};

export const editProduct = asyncHandler(async (req, res) => {
  const proId = req.params.Id;
  const editProductInfo = await Product.findById(proId);
  if (!editProductInfo) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  res.status(200).json({ success: true, editProductInfo });
});

export const editProductPost = asyncHandler(async (req, res) => {
  const proId = req.params.Id;
  if (!proId) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  const { category, size, material, quantity, narration } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    proId,
    {
      $set: {
        category,
        size,
        material,
        quantity,
        narration,
      },
    },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: 'Product not found or update failed',
    });
  }

  const redirectUrl = '/admin/all-product';
  res.status(201).json({
    products: updatedProduct,
    redirectUrl,
    success: true,
    message: 'Product successfully updated',
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.Id;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  await Product.findByIdAndDelete(productId);
  const redirectUrl = '/admin/all-product';
  res.status(201).json({
    redirectUrl,
    success: true,
    message: 'Product deleted successfully',
  });
});

export const allWastages = (req, res) => {
  const user = req.currentUser;
  res.render('admin/all-wastage', { user });
};

export const requestProduct = (req, res) => {
  const user = req.currentUser;
  res.render('admin/request-product', { user });
};

export const adminProfile = (req, res) => {
  const user = req.currentUser;
  res.render('admin/profile', { user });
};
