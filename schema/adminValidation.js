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
  category: Joi.string().allow('').trim().optional().messages({
    'string.empty': 'Category is required',
  }),

  newCategory: Joi.string().allow('').trim().optional().messages({
    'string.empty': 'Category is required',
  }),
  size: Joi.string().allow('').trim().optional().messages({
    'string.empty': 'Size is required',
  }),

  newSize: Joi.string().allow('').trim().optional().messages({
    'string.empty': 'Size is required',
  }),

  totalQuantity: Joi.number().positive().precision(2).required().messages({
    'number.base': 'Quantity must be a number',
    'any.required': 'Quantity is required',
  }),
  narration: Joi.string().trim().allow(null, '').optional().messages({
    'string.empty': 'narration is required',
  }),
});
