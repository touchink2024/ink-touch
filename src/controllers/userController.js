'use strict';
import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';
import { Conflict, HttpError } from '../middlewares/index.js';
import { User } from '../models/index.js';
// import { comparePassword, hashPassword } from '../utils/index.js';
import { sendMail } from '../utils/index.js';
import { asyncHandler, sendJsonResponse } from '../helper/index.js';

export const userIndex = (req, res) => {
  res.render('user/index');
};

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
