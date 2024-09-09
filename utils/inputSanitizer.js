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
