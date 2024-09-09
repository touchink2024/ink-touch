import { Router } from 'express';
// import { validateData } from '../middlewares/index.js';
import { signUpSchema } from '../schema/index.js';
import {
  signUp,
  signUpPost,
  verifyEmail,
  verifyEmailPost,
  forgetPassword,
  forgetPasswordPost,
  resetPassword,
  resetPasswordPost,
  login,
  loginPost,
} from '../controllers/index.js';

const authRoute = Router();

authRoute.get('/register', signUp);
authRoute.post('/register', signUpPost);
authRoute.get('/verify-email', verifyEmail);
authRoute.post('/verify-email', verifyEmailPost);
authRoute.get('/forget-password', forgetPassword);
authRoute.post('/forgetPassword', forgetPasswordPost);
authRoute.get('/reset-password/:resetToken', resetPassword);
authRoute.post('/resetPassword/:resetToken', resetPasswordPost);
authRoute.get('/login', login);
authRoute.post('/login', loginPost);

export { authRoute };
