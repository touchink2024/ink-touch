import { Router } from 'express';
import { userImage } from '../configs/index.js';
import { verifyUserToken, getUserById } from '../middlewares/index.js';
import { paginatedResults } from '../utils/index.js';
import { User, Wastage, RequestProduct } from '../models/index.js';
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
} from '../controllers/index.js';

const userRoute = Router();

userRoute.get(
  '/index',
  paginatedResults(RequestProduct),
  verifyUserToken,
  getUserById,
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
  paginatedResults(RequestProduct),
  verifyUserToken,
  getUserById,
  allRequest
);

userRoute.get('/wastage', verifyUserToken, getUserById, wastage);
userRoute.get(
  '/allWastage',
  paginatedResults(Wastage),
  verifyUserToken,
  getUserById,
  allWastage
);
userRoute.post('/wastage', verifyUserToken, getUserById, wastagePost);

userRoute.get('/profile', verifyUserToken, getUserById, profile);
userRoute.put('/profile', verifyUserToken, getUserById, profilePost);

export { userRoute };
