import { log } from './logger.js';
import { sendMail } from './mail.js';
import {
  welcomeEmail,
  forgetPasswordEmail,
  resetPasswordEmail,
  loginEmail,
  accountStatusMail,
} from './emailTemplates.js';
import {
  sanitizeInput,
  sanitizeObject,
  generateOTP,
} from './inputSanitizer.js';
import { paginatedResults } from './pagination.js';

export {
  log,
  sendMail,
  welcomeEmail,
  forgetPasswordEmail,
  resetPasswordEmail,
  loginEmail,
  accountStatusMail,
  sanitizeInput,
  sanitizeObject,
  generateOTP,
  paginatedResults,
};
