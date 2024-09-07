import Joi from 'joi';

export const addUserSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
  }),

  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
  }),

  phone_number: Joi.string().trim().min(6).required().messages({
    'string.empty': 'Number is required',
    'string.min': 'Number must be at least {#limit} characters',
    'any.required': 'Number is required',
  }),

  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is required',
  }),

  city: Joi.string().trim().required().messages({
    'string.empty': 'City is required',
  }),

  state: Joi.string().trim().required().messages({
    'string.empty': 'State is required',
  }),

  password: Joi.string().trim().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least {#limit} characters',
    'any.required': 'Password is required',
  }),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.empty': 'Confirm Password is required',
    'any.only': 'Passwords must match',
    'any.required': 'Confirm Password is required',
  }),

  role: Joi.string().trim().required().messages({
    'string.empty': 'role is required',
  }),
});

export const productSchema = Joi.object({
  category: Joi.string().trim().required().messages({
    'string.empty': 'Category is required',
  }),
  size: Joi.string().trim().required().messages({
    'string.empty': 'Size is required',
  }),
  material: Joi.string().trim().required().messages({
    'string.empty': 'Material is required',
  }),
  quantity: Joi.number().required().messages({
    'number.base': 'Quantity must be a number',
    'any.required': 'Quantity is required',
  }),
  narration: Joi.string().trim().required().messages({
    'string.empty': 'narration is required',
  }),
});
