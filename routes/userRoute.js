import { Router } from 'express';
import { userImage } from '../configs/index.js';
import { verifyUserToken, getUserById } from '../middlewares/index.js';
import { paginatedResults, userRequestFilter } from '../utils/index.js';
import { Wastage, RequestProduct, Return } from '../models/index.js';
import {
  userIndex,
  uploadUserImage,
  request,
  getProductQuantity,
  requestPost,
  allRequest,
  prodReturn,
  getRefs,
  getRefDetails,
  prodReturnPost,
  allReturn,
  wastage,
  allWastage,
  wastagePost,
  profile,
  profilePost,
  userLogout,
} from '../controllers/index.js';

const userRoute = Router();

userRoute.get(
  '/index',
  verifyUserToken,
  getUserById,
  paginatedResults(RequestProduct, userRequestFilter),
  userIndex
);
userRoute.post(
  '/uploadUserImage',
  verifyUserToken,
  getUserById,
  userImage.single('image'),
  uploadUserImage
);

userRoute.get('/request', verifyUserToken, getUserById, request);
userRoute.get(
  '/product-quantity',
  verifyUserToken,
  getUserById,
  getProductQuantity
);
userRoute.post('/request', verifyUserToken, getUserById, requestPost);
userRoute.get(
  '/allRequest',
  verifyUserToken,
  getUserById,
  paginatedResults(RequestProduct, userRequestFilter),
  allRequest
);

userRoute.get('/return', verifyUserToken, getUserById, prodReturn);
userRoute.post('/return', verifyUserToken, getUserById, prodReturnPost);
userRoute.get(
  '/allReturn',
  verifyUserToken,
  getUserById,
  paginatedResults(Return, userRequestFilter),
  allReturn
);
userRoute.get('/getRefs', verifyUserToken, getUserById, getRefs);
userRoute.get(
  '/getRefDetails/:refId',
  verifyUserToken,
  getUserById,
  getRefDetails
);

userRoute.get('/wastage', verifyUserToken, getUserById, wastage);
userRoute.get(
  '/allWastage',
  verifyUserToken,
  getUserById,
  paginatedResults(Wastage, userRequestFilter),
  allWastage
);
userRoute.post('/wastage', verifyUserToken, getUserById, wastagePost);

userRoute.get('/profile', verifyUserToken, getUserById, profile);
userRoute.put('/profile', verifyUserToken, getUserById, profilePost);
userRoute.delete('/logout', verifyUserToken, getUserById, userLogout);

export { userRoute };
