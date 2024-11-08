import { Router } from 'express';
import * as adminCOntroller from '../controllers/index.js';
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

const adminRoute = Router();

adminRoute.get(
  '/index',
  paginatedResults(RequestProduct),
  verifyUserToken,
  getAdminById,
  adminCOntroller.adminIndex
);

adminRoute.post(
  '/uploadAdminImage',
  verifyUserToken,
  getAdminById,
  adminImage.single('image'),
  adminCOntroller.uploadAdminImage
);

adminRoute.get(
  '/all-user',
  paginatedResults(User),
  verifyUserToken,
  getAdminById,
  adminCOntroller.allUser
);
adminRoute.get(
  '/add-user',
  verifyUserToken,
  getAdminById,
  adminCOntroller.addUser
);
adminRoute.post(
  '/add-user',
  verifyUserToken,
  getAdminById,
  adminCOntroller.addUserPost
);
adminRoute.post(
  '/updateAccountStatus',
  verifyUserToken,
  getAdminById,
  adminCOntroller.updateAccountStatus
);
adminRoute.post(
  '/verifyAccount',
  verifyUserToken,
  getAdminById,
  adminCOntroller.verifyAccount
);

adminRoute.get(
  '/user/:userId',
  verifyUserToken,
  getAdminById,
  adminCOntroller.viewUser
);
adminRoute.get(
  '/editUser/:userId',
  verifyUserToken,
  getAdminById,
  adminCOntroller.editUser
);
adminRoute.put(
  '/editUser/:userId',
  verifyUserToken,
  getAdminById,
  checkRole(['Super_Admin']),
  adminCOntroller.editUserPost
);
adminRoute.delete(
  '/user/:userId',
  verifyUserToken,
  getAdminById,
  checkRole(['Super_Admin']),
  adminCOntroller.deleteUser
);

adminRoute.get(
  '/all-product',
  paginatedResults(Product),
  verifyUserToken,
  getAdminById,
  adminCOntroller.allProduct
);
adminRoute.get(
  '/add-product',
  verifyUserToken,
  getAdminById,
  adminCOntroller.addProduct
);
adminRoute.post(
  '/add-product',
  verifyUserToken,
  getAdminById,
  adminCOntroller.addProductPost
);
adminRoute.get(
  '/editProduct/:Id',
  verifyUserToken,
  getAdminById,
  adminCOntroller.editProduct
);
adminRoute.put(
  '/editProduct/:Id',
  verifyUserToken,
  getAdminById,
  adminCOntroller.editProductPost
);
adminRoute.delete(
  '/product/:Id',
  verifyUserToken,
  getAdminById,
  adminCOntroller.deleteProduct
);

adminRoute.get(
  '/request',
  paginatedResults(RequestProduct, pendingRequestFilter),
  verifyUserToken,
  getAdminById,
  adminCOntroller.requestProduct
);
adminRoute.post(
  '/request',
  verifyUserToken,
  getAdminById,
  adminCOntroller.requestProductPost
);
adminRoute.get(
  '/accept-request',
  paginatedResults(RequestProduct, acceptRequestFilter),
  verifyUserToken,
  getAdminById,
  adminCOntroller.acceptRequest
);
adminRoute.get(
  '/reject-request',
  paginatedResults(RequestProduct, rejectedRequestFilter),
  verifyUserToken,
  getAdminById,
  adminCOntroller.rejectRequest
);

adminRoute.get(
  '/all-return',
  paginatedResults(Return, pendingReturnFilter),
  verifyUserToken,
  getAdminById,
  adminCOntroller.returnProduct
);
adminRoute.post(
  '/all-return',
  verifyUserToken,
  getAdminById,
  adminCOntroller.returnProductPost
);
adminRoute.get(
  '/accept-return',
  paginatedResults(Return, acceptReturnFilter),
  verifyUserToken,
  getAdminById,
  adminCOntroller.acceptReturnProduct
);
adminRoute.get(
  '/reject-return',
  paginatedResults(Return, rejectedReturnFilter),
  verifyUserToken,
  getAdminById,
  adminCOntroller.rejectReturnProduct
);

adminRoute.get(
  '/all-wastage',
  paginatedResults(Wastage, pendingWasteFilter),
  verifyUserToken,
  getAdminById,
  adminCOntroller.allWastages
);
adminRoute.post(
  '/all-wastage',
  verifyUserToken,
  getAdminById,
  adminCOntroller.allWastagesPost
);
adminRoute.get(
  '/accept-wastage',
  paginatedResults(Wastage, acceptWasteFilter),
  verifyUserToken,
  getAdminById,
  adminCOntroller.acceptWaste
);
adminRoute.get(
  '/reject-wastage',
  paginatedResults(Wastage, rejectedWasteFilter),
  verifyUserToken,
  getAdminById,
  adminCOntroller.rejectWaste
);

adminRoute.get(
  '/profile',
  verifyUserToken,
  getAdminById,
  adminCOntroller.adminProfile
);
adminRoute.put(
  '/profile',
  verifyUserToken,
  getAdminById,
  adminCOntroller.adminProfilePost
);

adminRoute.get(
  '/search-report',
  verifyUserToken,
  getAdminById,
  adminCOntroller.searchReport
);
adminRoute.post(
  '/material-search',
  verifyUserToken,
  getAdminById,
  adminCOntroller.getConsolidatedMaterialReport
);

adminRoute.get(
  '/message',
  verifyUserToken,
  getAdminById,
  adminCOntroller.adminMessage
);

adminRoute.get(
  '/message/:userId',
  verifyUserToken,
  getAdminById,
  adminCOntroller.getMessagesForUser
);

adminRoute.post(
  '/message',
  verifyUserToken,
  getAdminById,
  adminCOntroller.sendMessageToUser
);

adminRoute.delete(
  '/logout',
  verifyUserToken,
  getAdminById,
  adminCOntroller.adminLogout
);

export { adminRoute };
