import { Router } from 'express';
import {
  adminIndex,
  allProduct,
  addProduct,
  allAdmin,
  addAdmin,
  allWastages,
  allUser,
  addUser,
  requestProduct,
  adminProfile,
} from '../controllers/index.js';

const adminRoute = Router();

adminRoute.get('/index', adminIndex);
adminRoute.get('/all-product', allProduct);
adminRoute.get('/add-product', addProduct);
adminRoute.get('/all-wastage', allWastages);
adminRoute.get('/all-user', allUser);
adminRoute.get('/add-user', addUser);
adminRoute.get('/all-admin', allAdmin);
adminRoute.get('/add-admin', addAdmin);
adminRoute.get('/request-product', requestProduct);
adminRoute.get('/profile', adminProfile);

export { adminRoute };
