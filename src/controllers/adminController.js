'use strict';
import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';
import { Conflict, HttpError } from '../middlewares/index.js';
import { User } from '../models/index.js';
// import { comparePassword, hashPassword } from '../utils/index.js';
import { sendMail } from '../utils/index.js';
import { asyncHandler, sendJsonResponse } from '../helper/index.js';

export const adminIndex = (req, res) => {
  res.render('admin/index');
};

export const addProduct = (req, res) => {
  res.render('admin/add-product');
};

export const allProduct = (req, res) => {
  res.render('admin/all-product');
};

export const allWastages = (req, res) => {
  res.render('admin/all-wastage');
};

export const allUser = (req, res) => {
  res.render('admin/all-user');
};

export const addUser = (req, res) => {
  res.render('admin/add-user');
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
