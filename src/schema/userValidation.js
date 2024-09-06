import Joi from 'joi';

// export const loginSchema = Joi.object({
//   email: Joi.string().trim().email().required().messages({
//     'string.empty': 'Email is required',
//     'string.email': 'Email must be valid',
//   }),
//   password: Joi.string().trim().min(6).required().messages({
//     'string.empty': 'Password is required',
//     'string.min': 'Password must be at least {#limit} characters',
//     'any.required': 'Password is required',
//   }),
// });

// export const resetPasswordSchema = Joi.object({
//   password: Joi.string().min(6).required().messages({
//     'string.empty': 'Password is required',
//     'string.min': 'Password must be at least {#limit} characters',
//     'any.required': 'Password is required',
//   }),
// });

// export const userUpdateSchema = z.object({
//   name: z
//     .string()
//     .trim()
//     .max(100, "Name can't exceed 100 characters")
//     .optional(),
//   email: z
//     .string()
//     .trim()
//     .toLowerCase()
//     .email('Invalid email address')
//     .optional(),
//   password: z
//     .string()
//     .trim()
//     .min(8, 'Password must be at least 8 characters long')
//     .max(100, "Password can't exceed 100 characters")
//     .optional(),
// });

// role: Joi.string().trim().valid('User', 'Admin').required().messages({
//   'string.empty': 'Role is required',
// }),
