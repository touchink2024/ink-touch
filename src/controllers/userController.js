'use strict';
import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';
import { Conflict, HttpError } from '../middlewares/index.js';
import { User } from '../models/index.js';
import { sendMail } from '../utils/index.js';
import { asyncHandler, sendJsonResponse } from '../helper/index.js';

export const userIndex = (req, res) => {
  const user = req.currentUser;
  res.render('user/index', { user });
};

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

export const request = (req, res) => {
  res.render('user/request');
};

export const allRequest = (req, res) => {
  res.render('user/allRequest');
};

export const wastage = (req, res) => {
  res.render('user/wastage');
};

export const allWastage = (req, res) => {
  res.render('user/allWastage');
};

export const profile = (req, res) => {
  res.render('user/profile');
};
