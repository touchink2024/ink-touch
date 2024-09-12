import {
  signUp,
  signUpPost,
  forgetPassword,
  forgetPasswordPost,
  resetPassword,
  resetPasswordPost,
  login,
  loginPost,
} from './authController.js';
import {
  userIndex,
  uploadUserImage,
  request,
  getProductQuantity,
  requestPost,
  allRequest,
  prodReturn,
  prodReturnPost,
  allReturn,
  wastage,
  allWastage,
  wastagePost,
  profile,
  profilePost,
  userLogout,
} from './userController.js';

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
  searchReport,
  adminLogout,
} from './adminController.js';

export {
  //auth
  signUp,
  signUpPost,
  forgetPassword,
  forgetPasswordPost,
  resetPassword,
  resetPasswordPost,
  login,
  loginPost,
  //user
  userIndex,
  uploadUserImage,
  request,
  getProductQuantity,
  requestPost,
  allRequest,
  prodReturn,
  prodReturnPost,
  allReturn,
  wastage,
  allWastage,
  wastagePost,
  profile,
  profilePost,
  userLogout,
  //admin
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
  searchReport,
  adminLogout,
};
