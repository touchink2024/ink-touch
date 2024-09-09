import { Router } from 'express';
import { userImage } from '../configs/index.js';
import { verifyUserToken, getUserById } from '../middlewares/index.js';
import { paginatedResults, userRequestFilter } from '../utils/index.js';
import { Wastage, RequestProduct } from '../models/index.js';
import {
  userIndex,
  uploadUserImage,
  request,
  requestPost,
  allRequest,
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
userRoute.post('/request', verifyUserToken, getUserById, requestPost);
userRoute.get(
  '/allRequest',
  verifyUserToken,
  getUserById,
  paginatedResults(RequestProduct, userRequestFilter),
  allRequest
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
