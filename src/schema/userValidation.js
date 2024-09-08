import Joi from 'joi';

export const requestSchema = Joi.object({
  ref: Joi.string().trim().required().messages({
    'string.empty': 'Ref is required',
  }),
  operator: Joi.string().trim().required().messages({
    'string.empty': 'Operator is required',
  }),
  category: Joi.string().trim().required().messages({
    'string.empty': 'Category is required',
  }),
  size: Joi.string().trim().required().messages({
    'string.empty': 'Size is required',
  }),
  material: Joi.string().trim().required().messages({
    'string.empty': 'Material is required',
  }),
  quantity_requested: Joi.number().required().messages({
    'number.base': 'Quantity must be a number',
    'any.required': 'Quantity is required',
  }),
  narration: Joi.string().trim().required().messages({
    'string.empty': 'narration is required',
  }),
});

export const wasteSchema = Joi.object({
  ref: Joi.string().trim().required().messages({
    'string.empty': 'Ref is required',
  }),
  operator: Joi.string().trim().required().messages({
    'string.empty': 'Operator is required',
  }),
  category: Joi.string().trim().required().messages({
    'string.empty': 'Category is required',
  }),
  size: Joi.string().trim().required().messages({
    'string.empty': 'Size is required',
  }),
  material: Joi.string().trim().required().messages({
    'string.empty': 'Material is required',
  }),
  waste_quantity: Joi.number().required().messages({
    'number.base': 'Quantity must be a number',
    'any.required': 'Quantity is required',
  }),
  narration: Joi.string().trim().required().messages({
    'string.empty': 'narration is required',
  }),
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().trim().required().messages({
    'string.empty': 'Email is required',
  }),
  phone_number: Joi.string().trim().required().messages({
    'string.empty': 'Number is required',
  }),
  password: Joi.string().trim().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least {#limit} characters',
    'any.required': 'Password is required',
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
});
