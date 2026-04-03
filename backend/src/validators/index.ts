import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .trim(),
  email: z
    .string()
    .email('Invalid email address')
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters'),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, 'Password is required'),
});

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be at most 200 characters')
    .trim(),
  description: z
    .string()
    .max(2000, 'Description must be at most 2000 characters')
    .trim()
    .optional()
    .nullable(),
  status: z
    .enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    .optional()
    .default('PENDING'),
  priority: z
    .enum(['LOW', 'MEDIUM', 'HIGH'])
    .optional()
    .default('MEDIUM'),
  dueDate: z
    .string()
    .datetime()
    .optional()
    .nullable(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be at most 200 characters')
    .trim()
    .optional(),
  description: z
    .string()
    .max(2000, 'Description must be at most 2000 characters')
    .trim()
    .optional()
    .nullable(),
  status: z
    .enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    .optional(),
  priority: z
    .enum(['LOW', 'MEDIUM', 'HIGH'])
    .optional(),
  dueDate: z
    .string()
    .datetime()
    .optional()
    .nullable(),
});

export const taskQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .optional()
    .default('10')
    .transform(Number)
    .pipe(z.number().int().positive().max(100)),
  status: z
    .enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    .optional(),
  priority: z
    .enum(['LOW', 'MEDIUM', 'HIGH'])
    .optional(),
  search: z
    .string()
    .optional()
    .default(''),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'dueDate', 'title', 'priority', 'status'])
    .optional()
    .default('createdAt'),
  sortOrder: z
    .enum(['asc', 'desc'])
    .optional()
    .default('desc'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskQueryInput = z.infer<typeof taskQuerySchema>;
