import { Router } from 'express';
import { userImage } from '../configs/index.js';
import { verifyUserToken, getUserById } from '../middlewares/index.js';
import {
  userIndex,
  uploadUserImage,
  request,
  allRequest,
  wastage,
  allWastage,
  profile,
} from '../controllers/index.js';

const userRoute = Router();

userRoute.get('/index', verifyUserToken, getUserById, userIndex);
userRoute.post(
  '/uploadUserImage',
  verifyUserToken,
  getUserById,
  userImage.single('image'),
  uploadUserImage
);
userRoute.get('/request', verifyUserToken, getUserById, request);
userRoute.get('/allRequest', verifyUserToken, getUserById, allRequest);
userRoute.get('/wastage', verifyUserToken, getUserById, wastage);
userRoute.get('/allWastage', verifyUserToken, getUserById, allWastage);
userRoute.get('/profile', verifyUserToken, getUserById, profile);

export { userRoute };
