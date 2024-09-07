import { log } from './logger.js';
import { sendMail } from './mail.js';
import { generateOTP } from './otpUtils.js';
import { sanitizeInput, sanitizeObject } from './inputSanitizer.js';
import { paginatedResults } from './pagination.js';
import {
  verifyEmailOtp,
  welcomeEmail,
  forgetPasswordEmail,
  resetPasswordEmail,
  loginEmail,
  accountStatusMail,
} from './emailTemplates.js';

export {
  log,
  sendMail,
  generateOTP,
  verifyEmailOtp,
  welcomeEmail,
  forgetPasswordEmail,
  resetPasswordEmail,
  loginEmail,
  accountStatusMail,
  sanitizeInput,
  sanitizeObject,
  paginatedResults,
};
