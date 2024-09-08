import {
  signUpSchema,
  resetPasswordSchema,
  loginSchema,
} from './authValidation.js';
import {
  requestSchema,
  wasteSchema,
  updateProfileSchema,
} from './userValidation.js';
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
  requestSchema,
  wasteSchema,
  updateProfileSchema,
};
