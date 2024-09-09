import { Router } from 'express';
import { paginatedResults } from '../utils/index.js';
import { User, Product, RequestProduct, Wastage } from '../models/index.js';
import { adminImage } from '../configs/index.js';
import {
  verifyUserToken,
  getAdminById,
  checkRole,
} from '../middlewares/index.js';
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
  requestProduct,
  requestProductPost,
  allWastages,
  allWastagesPost,
  adminProfile,
  adminProfilePost,
  adminLogout,
} from '../controllers/index.js';

const adminRoute = Router();

adminRoute.get(
  '/index',
  paginatedResults(RequestProduct),
  verifyUserToken,
  getAdminById,
  adminIndex
);

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
  checkRole(['Super_Admin']),
  editUserPost
);
adminRoute.delete(
  '/user/:userId',
  verifyUserToken,
  getAdminById,
  checkRole(['Super_Admin']),
  deleteUser
);

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

adminRoute.get(
  '/request',
  paginatedResults(RequestProduct),
  verifyUserToken,
  getAdminById,
  requestProduct
);
adminRoute.post('/request', verifyUserToken, getAdminById, requestProductPost);

adminRoute.get(
  '/all-wastage',
  paginatedResults(Wastage),
  verifyUserToken,
  getAdminById,
  allWastages
);
adminRoute.post('/all-wastage', verifyUserToken, getAdminById, allWastagesPost);

adminRoute.get('/profile', verifyUserToken, getAdminById, adminProfile);
adminRoute.put('/profile', verifyUserToken, getAdminById, adminProfilePost);

adminRoute.delete('/logout', verifyUserToken, getAdminById, adminLogout);

export { adminRoute };
