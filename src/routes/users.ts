import { Router } from 'express';
import type { Request, Response } from 'express';
import { UserController } from '../controllers/userController.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema.js';

export const userRouter = Router();
const userController = new UserController();

// GET /api/users
userRouter.get('/', (req: Request, res: Response) => {
  userController.getAllUsers(req, res);
});

// GET /api/users/:id
userRouter.get('/:id', (req: Request, res: Response) => {
  userController.getUserById(req, res);
});

// POST /api/users
userRouter.post('/', validate(createUserSchema), (req: Request, res: Response) => {
  userController.createUser(req, res);
});

// PUT /api/users/:id
userRouter.put('/:id', validate(updateUserSchema), (req: Request, res: Response) => {
  userController.updateUser(req, res);
});

// DELETE /api/users/:id
userRouter.delete('/:id', (req: Request, res: Response) => {
  userController.deleteUser(req, res);
});
