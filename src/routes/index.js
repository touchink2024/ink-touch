import express from 'express';
const router = express.Router();

import { authRoute } from '../routes/authRoute.js';
import { userRoute } from '../routes/userRoute.js';
import { adminRoute } from '../routes/adminRoute.js';
import { appMiddleware } from '../middlewares/index.js';

//middlewares
router.use(appMiddleware);

// Mount the admin authentication routes under /auth/admin
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/admin', adminRoute);

export { router };
