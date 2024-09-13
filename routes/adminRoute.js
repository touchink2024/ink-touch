import { Router } from 'express';
import { adminImage } from '../configs/index.js';
import {
  User,
  Product,
  RequestProduct,
  Wastage,
  Return,
} from '../models/index.js';
import {
  paginatedResults,
  rejectedRequestFilter,
  acceptRequestFilter,
  pendingRequestFilter,
  acceptReturnFilter,
  rejectedReturnFilter,
  pendingReturnFilter,
  pendingWasteFilter,
  acceptWasteFilter,
  rejectedWasteFilter,
} from '../utils/index.js';
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
  verifyAccount,
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
  acceptRequest,
  rejectRequest,
  returnProduct,
  returnProductPost,
  acceptReturnProduct,
  rejectReturnProduct,
  allWastages,
  allWastagesPost,
  acceptWaste,
  rejectWaste,
  adminProfile,
  adminProfilePost,
  userReport,
  getOperatorReport,
  materialReport,
  getMaterialReport,
  searchReport,
  getMaterialsByDate,
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
adminRoute.post('/verifyAccount', verifyUserToken, getAdminById, verifyAccount);

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
  paginatedResults(RequestProduct, pendingRequestFilter),
  verifyUserToken,
  getAdminById,
  requestProduct
);
adminRoute.post('/request', verifyUserToken, getAdminById, requestProductPost);
adminRoute.get(
  '/accept-request',
  paginatedResults(RequestProduct, acceptRequestFilter),
  verifyUserToken,
  getAdminById,
  acceptRequest
);
adminRoute.get(
  '/reject-request',
  paginatedResults(RequestProduct, rejectedRequestFilter),
  verifyUserToken,
  getAdminById,
  rejectRequest
);

adminRoute.get(
  '/all-return',
  paginatedResults(Return, pendingReturnFilter),
  verifyUserToken,
  getAdminById,
  returnProduct
);
adminRoute.post(
  '/all-return',
  verifyUserToken,
  getAdminById,
  returnProductPost
);
adminRoute.get(
  '/accept-return',
  paginatedResults(Return, acceptReturnFilter),
  verifyUserToken,
  getAdminById,
  acceptReturnProduct
);
adminRoute.get(
  '/reject-return',
  paginatedResults(Return, rejectedReturnFilter),
  verifyUserToken,
  getAdminById,
  rejectReturnProduct
);

adminRoute.get(
  '/all-wastage',
  paginatedResults(Wastage, pendingWasteFilter),
  verifyUserToken,
  getAdminById,
  allWastages
);
adminRoute.post('/all-wastage', verifyUserToken, getAdminById, allWastagesPost);
adminRoute.get(
  '/accept-wastage',
  paginatedResults(Wastage, acceptWasteFilter),
  verifyUserToken,
  getAdminById,
  acceptWaste
);
adminRoute.get(
  '/reject-wastage',
  paginatedResults(Wastage, rejectedWasteFilter),
  verifyUserToken,
  getAdminById,
  rejectWaste
);

adminRoute.get('/profile', verifyUserToken, getAdminById, adminProfile);
adminRoute.put('/profile', verifyUserToken, getAdminById, adminProfilePost);

adminRoute.get('/user-report', verifyUserToken, getAdminById, userReport);
adminRoute.get(
  '/operator-report',
  verifyUserToken,
  getAdminById,
  getOperatorReport
);

adminRoute.get(
  '/material-report',
  verifyUserToken,
  getAdminById,
  materialReport
);
adminRoute.get(
  '/get-material-report',
  verifyUserToken,
  getAdminById,
  getMaterialReport
);

adminRoute.get('/search-report', verifyUserToken, getAdminById, searchReport);
adminRoute.post(
  '/material-search',
  verifyUserToken,
  getAdminById,
  getMaterialsByDate
);

adminRoute.delete('/logout', verifyUserToken, getAdminById, adminLogout);

export { adminRoute };
