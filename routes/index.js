import express from 'express';
const router = express.Router();

import { pageRoute } from '../routes/pageRoute.js';
import { authRoute } from '../routes/authRoute.js';
import { userRoute } from '../routes/userRoute.js';
import { adminRoute } from '../routes/adminRoute.js';
import { appMiddleware } from '../middlewares/index.js';

//middlewares
router.use(appMiddleware);

router.use('/', pageRoute);
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/admin', adminRoute);

export { router };
