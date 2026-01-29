import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  createdAt: z.date().optional(),
});

export const createUserSchema = userSchema.omit({ createdAt: true });

export const updateUserSchema = userSchema.partial();

export type UserSchema = z.infer<typeof userSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
