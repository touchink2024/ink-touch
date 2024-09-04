// 'use strict';
// const express = require('express');
// const router = express.Router();
// const { verifyUserToken, getUserById } = require('../middlewares');
// const { Product, Order } = require('../models');
// const { userImage, reportImage } = require('../configs/multer');
// const { userController } = require('../controllers');

// router.get('/index', userController.userLandingPage);

// module.exports = router;

import { Router } from 'express';
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
