import { Router } from 'express';
import * as userController from '../controllers/index.js';
import { userImage } from '../configs/index.js';
import { verifyUserToken, getUserById } from '../middlewares/index.js';
import { paginatedResults, userRequestFilter } from '../utils/index.js';
import { Wastage, RequestProduct, Return } from '../models/index.js';

const userRoute = Router();

userRoute.get(
  '/index',
  verifyUserToken,
  getUserById,
  paginatedResults(RequestProduct, userRequestFilter),
  userController.userIndex
);
userRoute.post(
  '/uploadUserImage',
  verifyUserToken,
  getUserById,
  userImage.single('image'),
  userController.uploadUserImage
);

userRoute.get('/request', verifyUserToken, getUserById, userController.request);
userRoute.get(
  '/product-quantity',
  verifyUserToken,
  getUserById,
  userController.getProductQuantity
);
userRoute.post(
  '/request',
  verifyUserToken,
  getUserById,
  userController.requestPost
);
userRoute.get(
  '/allRequest',
  verifyUserToken,
  getUserById,
  paginatedResults(RequestProduct, userRequestFilter),
  userController.allRequest
);

userRoute.get(
  '/return',
  verifyUserToken,
  getUserById,
  userController.prodReturn
);
userRoute.post(
  '/return',
  verifyUserToken,
  getUserById,
  userController.prodReturnPost
);
userRoute.get(
  '/allReturn',
  verifyUserToken,
  getUserById,
  paginatedResults(Return, userRequestFilter),
  userController.allReturn
);
userRoute.get('/getRefs', verifyUserToken, getUserById, userController.getRefs);
userRoute.get(
  '/getRefDetails/:refId',
  verifyUserToken,
  getUserById,
  userController.getRefDetails
);

userRoute.get('/wastage', verifyUserToken, getUserById, userController.wastage);
userRoute.get(
  '/allWastage',
  verifyUserToken,
  getUserById,
  paginatedResults(Wastage, userRequestFilter),
  userController.allWastage
);
userRoute.post(
  '/wastage',
  verifyUserToken,
  getUserById,
  userController.wastagePost
);

userRoute.get('/profile', verifyUserToken, getUserById, userController.profile);
userRoute.put(
  '/profile',
  verifyUserToken,
  getUserById,
  userController.profilePost
);

userRoute.get(
  '/message',
  verifyUserToken,
  getUserById,
  userController.getUserMessages
);

userRoute.delete(
  '/logout',
  verifyUserToken,
  getUserById,
  userController.userLogout
);

export { userRoute };
