import { Router } from 'express';
import { authMiddleware, checkRole } from '../middlewares/index.js';
import {
  userIndex,
  request,
  allRequest,
  wastage,
  allWastage,
  profile,
} from '../controllers/index.js';

const userRoute = Router();

userRoute.get('/index', userIndex);
userRoute.get('/request', request);
userRoute.get('/allRequest', allRequest);
userRoute.get('/wastage', wastage);
userRoute.get('/allWastage', allWastage);
userRoute.get('/profile', profile);

export { userRoute };
