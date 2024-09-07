import { Router } from 'express';
import { paginatedResults } from '../utils/index.js';
import { User, Product } from '../models/index.js';
import { adminImage } from '../configs/index.js';
import { verifyUserToken, getAdminById } from '../middlewares/index.js';
import {
  adminIndex,
  uploadAdminImage,
  allUser,
  addUser,
  addUserPost,
  updateAccountStatus,
  viewUser,
  editUser,
  editUserPost,
  deleteUser,
  allProduct,
  addProduct,
  addProductPost,
  editProduct,
  editProductPost,
  deleteProduct,
  allWastages,
  requestProduct,
  adminProfile,
} from '../controllers/index.js';

const adminRoute = Router();

adminRoute.get('/index', verifyUserToken, getAdminById, adminIndex);

adminRoute.post(
  '/uploadAdminImage',
  verifyUserToken,
  getAdminById,
  adminImage.single('image'),
  uploadAdminImage
);

adminRoute.get(
  '/all-user',
  paginatedResults(User),
  verifyUserToken,
  getAdminById,
  allUser
);
adminRoute.get('/add-user', verifyUserToken, getAdminById, addUser);
adminRoute.post('/add-user', verifyUserToken, getAdminById, addUserPost);
adminRoute.post(
  '/updateAccountStatus',
  verifyUserToken,
  getAdminById,
  updateAccountStatus
);
adminRoute.get('/user/:userId', verifyUserToken, getAdminById, viewUser);
adminRoute.get('/editUser/:userId', verifyUserToken, getAdminById, editUser);
adminRoute.put(
  '/editUser/:userId',
  verifyUserToken,
  getAdminById,
  editUserPost
);
adminRoute.delete('/user/:userId', verifyUserToken, getAdminById, deleteUser);

adminRoute.get(
  '/all-product',
  paginatedResults(Product),
  verifyUserToken,
  getAdminById,
  allProduct
);
adminRoute.get('/add-product', verifyUserToken, getAdminById, addProduct);
adminRoute.post('/add-product', verifyUserToken, getAdminById, addProductPost);
adminRoute.get('/editProduct/:Id', verifyUserToken, getAdminById, editProduct);
adminRoute.put(
  '/editProduct/:Id',
  verifyUserToken,
  getAdminById,
  editProductPost
);
adminRoute.delete('/product/:Id', verifyUserToken, getAdminById, deleteProduct);

adminRoute.get('/all-wastage', verifyUserToken, getAdminById, allWastages);

adminRoute.get(
  '/request-product',
  verifyUserToken,
  getAdminById,
  requestProduct
);
adminRoute.get('/profile', verifyUserToken, getAdminById, adminProfile);

export { adminRoute };
