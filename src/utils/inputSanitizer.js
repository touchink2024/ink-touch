import validator from 'validator';

export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    input = validator.trim(input);
    input = validator.escape(input);
  }
  return input;
};

export const sanitizeObject = (obj) => {
  const sanitizedObj = {};
  Object.keys(obj).forEach((key) => {
    sanitizedObj[key] = sanitizeInput(obj[key]);
  });
  return sanitizedObj;
};

export function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
