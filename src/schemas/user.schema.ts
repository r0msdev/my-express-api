import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Server-managed fields are never accepted from clients
const serverManagedFields = { createdAt: true, updatedAt: true } as const;

export const createUserSchema = userSchema.omit(serverManagedFields);

export const updateUserSchema = userSchema.omit(serverManagedFields).partial();

export type UserSchema = z.infer<typeof userSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
