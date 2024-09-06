import {
  signUpSchema,
  resetPasswordSchema,
  loginSchema,
} from './authValidation.js';
// import { loginSchema } from './userValidation.js';
import { productSchema, addUserSchema } from './adminValidation.js';

export {
  //auth
  signUpSchema,
  resetPasswordSchema,
  loginSchema,
  //admin
  productSchema,
  addUserSchema,
  //user
};
