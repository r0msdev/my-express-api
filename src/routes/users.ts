import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { validate } from '../middleware/validate.js';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema.js';
import type { Cradle } from '../config/container.js';

export function createUserRouter(container: { cradle: Cradle }) {
  const userRouter = Router();
  const { userController } = container.cradle;

  // GET /api/users
  userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    userController.getAllUsers(req, res, next);
  });

  // GET /api/users/:id
  userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    userController.getUserById(req, res, next);
  });

  // POST /api/users
  userRouter.post('/', validate(createUserSchema), (req: Request, res: Response, next: NextFunction) => {
    userController.createUser(req, res, next);
  });

  // PUT /api/users/:id
  userRouter.put('/:id', validate(updateUserSchema), (req: Request, res: Response, next: NextFunction) => {
    userController.updateUser(req, res, next);
  });

  // DELETE /api/users/:id
  userRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    userController.deleteUser(req, res, next);
  });

  return userRouter;
}
