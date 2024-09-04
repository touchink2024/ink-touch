import { Router } from 'express';
import {
  signUp,
  signUpPost,
  forgetPassword,
  forgetPasswordPost,
  login,
  loginPost,
  // login,
  // forgotPassword,
  // resetPassword,
} from '../controllers/index.js';

const authRoute = Router();

authRoute.get('/register', signUp);
authRoute.post('/register', signUpPost);
authRoute.get('/forgetPassword', forgetPassword);
authRoute.post('/forgetPassword', forgetPasswordPost);
authRoute.get('/login', login);
authRoute.get('/login', loginPost);

// authRoute.post('/auth/verify-otp', verifyOtp);
// authRoute.post('/auth/login', login);
// authRoute.post('/auth/reset-password-request', forgotPassword);
// authRoute.post('/auth/reset-password', resetPassword);

export { authRoute };
