import { log } from './logger.js';
import { sendMail } from './mail.js';
import { generateOTP, generateUniqueRef } from './otpUtils.js';
import { sanitizeInput, sanitizeObject } from './inputSanitizer.js';
import {
  paginatedResults,
  userRequestFilter,
  allProductsFilter,
} from './pagination.js';
import {
  verifyEmailOtp,
  welcomeEmail,
  forgetPasswordEmail,
  resetPasswordEmail,
  loginEmail,
  accountStatusMail,
  requestProductMail,
  wasteProductMail,
  updateProfile,
  requestUpdateMail,
  wasteUpdateMail,
} from './emailTemplates.js';

export {
  log,
  sendMail,
  generateOTP,
  generateUniqueRef,
  verifyEmailOtp,
  welcomeEmail,
  forgetPasswordEmail,
  resetPasswordEmail,
  loginEmail,
  accountStatusMail,
  requestProductMail,
  wasteProductMail,
  updateProfile,
  requestUpdateMail,
  wasteUpdateMail,
  sanitizeInput,
  sanitizeObject,
  paginatedResults,
  userRequestFilter,
  allProductsFilter,
};
