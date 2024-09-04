import { z } from 'zod';

export const userSignUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, "Name can't exceed 100 characters"),
  email: z.string().trim().toLowerCase().email('Invalid email address'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, "Password can't exceed 100 characters"),
});

export const userUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, "Name can't exceed 100 characters")
    .optional(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid email address')
    .optional(),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, "Password can't exceed 100 characters")
    .optional(),
});
