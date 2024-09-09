'use strict';
import { cloudinary } from '../configs/index.js';
import { User, RequestProduct, Product, Wastage } from '../models/index.js';
import { asyncHandler } from '../helper/index.js';
import bcrypt from 'bcryptjs';
import {
  requestSchema,
  wasteSchema,
  updateProfileSchema,
} from '../schema/index.js';
import {
  sanitizeObject,
  sendMail,
  generateUniqueRef,
  requestProductMail,
  wasteProductMail,
  updateProfile,
} from '../utils/index.js';

export const userIndex = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }

  const { results, currentPage, totalPages } = res.paginatedResults;

  const requestProducts = await RequestProduct.countDocuments({
    userId: user._id,
  });
  const wastage = await Wastage.countDocuments({
    userId: user._id,
  });
  const totalRequestProducts = await RequestProduct.countDocuments({
    userId: user._id,
    request_status: 'Accept',
  });
  const totalWastage = await Wastage.countDocuments({
    userId: user._id,
    waste_status: 'Approved',
  });

  res.render('user/index', {
    user,
    allRequest: results,
    currentPage,
    totalPages,
    totalRequestProducts,
    totalWastage,
    requestProducts,
    wastage,
  });
});

export const uploadUserImage = asyncHandler(async (req, res) => {
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
  const callbackUrl = '/user/index';
  return res.status(200).json({
    callbackUrl,
    success: true,
    message: 'Image uploaded successfully',
  });
});

export const request = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const ref = await generateUniqueRef();
  res.render('user/request', { user, ref });
});

export const requestPost = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const sanitizedBody = sanitizeObject(req.body);
  const {
    ref,
    operator,
    category,
    size,
    material,
    quantity_requested,
    narration,
  } = sanitizedBody;

  const { error, value } = requestSchema.validate(sanitizedBody, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const product = await Product.findOne({ category, size, material });
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found.' });
  }
  if (product.totalQuantity < quantity_requested) {
    return res
      .status(400)
      .json({ success: false, message: 'Insufficient product quantity.' });
  }

  const requestProduct = new RequestProduct({
    ref,
    operator,
    category,
    size,
    material,
    quantity_requested,
    narration,
    userId: user._id,
  });
  await requestProduct.save();

  const emailContent = requestProductMail(user, requestProduct);
  await sendMail(emailContent);

  const redirectUrl = '/user/allRequest';
  return res.status(200).json({
    redirectUrl,
    success: true,
    message: 'Request submitted successfully.',
  });
});

export const allRequest = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;
  res.render('user/allRequest', {
    user,
    allRequest: results,
    currentPage,
    totalPages,
  });
};

export const wastage = (req, res) => {
  const user = req.currentUser;
  res.render('user/wastage', { user });
};

export const wastagePost = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const sanitizedBody = sanitizeObject(req.body);
  const { ref, operator, category, size, material, waste_quantity, narration } =
    sanitizedBody;

  const { error, value } = wasteSchema.validate(sanitizedBody, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const existingWaste = await Wastage.findOne({ ref });
  if (existingWaste) {
    return res
      .status(409)
      .json({ success: false, message: 'Waste already submitted' });
  }

  const newWastage = new Wastage({
    ref,
    operator,
    category,
    size,
    material,
    waste_quantity,
    narration,
    userId: user._id,
  });
  await newWastage.save();

  const emailContent = wasteProductMail(user, newWastage);
  await sendMail(emailContent);

  const redirectUrl = '/user/allWastage';
  return res.status(200).json({
    redirectUrl,
    success: true,
    message: 'Waste submitted successfully.',
  });
});

export const allWastage = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;
  res.render('user/allWastage', {
    user,
    allWaste: results,
    currentPage,
    totalPages,
  });
};

export const profile = (req, res) => {
  const user = req.currentUser;
  res.render('user/profile', { user });
};

export const profilePost = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const sanitizedBody = sanitizeObject(req.body);
  const {
    name,
    email,
    phone_number,
    current_password,
    new_password,
    address,
    city,
    state,
  } = sanitizedBody;

  const { error, value } = updateProfileSchema.validate(sanitizedBody, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const existingUser = await User.findById(user._id).select('+password');
  if (!existingUser) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  let updatedFields = {
    name,
    email,
    phone_number,
    address,
    city,
    state,
  };

  if (current_password && new_password) {
    const isPasswordMatch = await bcrypt.compare(
      current_password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect.',
      });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    updatedFields.password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, updatedFields, {
    new: true,
  });

  const emailContent = updateProfile(user, updatedUser);
  await sendMail(emailContent);

  const redirectUrl = '/user/profile';
  return res.status(200).json({
    redirectUrl,
    success: true,
    message: 'Profile updated successfully.',
  });
});

export const userLogout = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const logoutRedirectUrl = '/auth/login';

  res.setHeader('Clear-Site-Data', '"cookies"');
  res.clearCookie('accessToken');

  res
    .status(200)
    .json({ logoutRedirectUrl, success: true, message: 'You are logged out!' });
  res.end();
});
