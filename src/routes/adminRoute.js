import { Router } from 'express';
import { authMiddleware, checkRole } from '../middlewares/index.js';
import { paginatedResults } from '../utils/index.js';
import { User } from '../models/index.js';
import {
  adminIndex,
  allUser,
  addUser,
  addUserPost,
  updateAccountStatus,
  viewUser,
  editUser,
  editUserPost,
  allProduct,
  addProduct,
  addProductPost,
  allAdmin,
  addAdmin,
  allWastages,
  requestProduct,
  adminProfile,
} from '../controllers/index.js';

const adminRoute = Router();

adminRoute.get('/index', adminIndex);

adminRoute.get('/all-user', paginatedResults(User), allUser);
adminRoute.get('/add-user', addUser);
adminRoute.post('/add-user', addUserPost);
adminRoute.post('/updateAccountStatus', updateAccountStatus);
adminRoute.get('/viewUser/:userId', viewUser);
adminRoute.get('/editUser/:userId', editUser);
adminRoute.put('/editUser/:userId', editUserPost);

adminRoute.get('/all-product', allProduct);
adminRoute.get('/add-product', addProduct);
adminRoute.post('/add-product', addProductPost);
adminRoute.get('/all-wastage', allWastages);

adminRoute.get('/all-admin', allAdmin);
adminRoute.get('/add-admin', addAdmin);
adminRoute.get('/request-product', requestProduct);
adminRoute.get('/profile', adminProfile);

export { adminRoute };
