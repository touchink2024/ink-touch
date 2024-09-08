import { log } from './logger.js';
import { sendMail } from './mail.js';
import { generateOTP, generateUniqueRef } from './otpUtils.js';
import { sanitizeInput, sanitizeObject } from './inputSanitizer.js';
import { paginatedResults } from './pagination.js';
import {
  verifyEmailOtp,
  welcomeEmail,
  forgetPasswordEmail,
  resetPasswordEmail,
  loginEmail,
  accountStatusMail,
  requestProductMail,
  wasteProductMail,
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
  sanitizeInput,
  sanitizeObject,
  paginatedResults,
};
