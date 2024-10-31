import { Router } from 'express';
import * as authController from '../controllers/index.js';
import { signUpSchema } from '../schema/index.js';

const authRoute = Router();

authRoute.get('/register', authController.signUp);
authRoute.post('/register', authController.signUpPost);
authRoute.get('/forget-password', authController.forgetPassword);
authRoute.post('/forgetPassword', authController.forgetPasswordPost);
authRoute.get('/reset-password/:resetToken', authController.resetPassword);
authRoute.post('/resetPassword/:resetToken', authController.resetPasswordPost);
authRoute.get('/login', authController.login);
authRoute.post('/login', authController.loginPost);

export { authRoute };
