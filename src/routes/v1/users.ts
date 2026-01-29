import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { validate } from '../../middleware/validate.js';
import { createUserSchema, updateUserSchema } from '../../schemas/user.schema.js';
import type { Cradle } from '../../config/container.js';

export function createUserRouter(_container: { cradle: Cradle }) {
  const userRouter = Router();

  // GET /api/v1/users
  userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    const { userController } = req.scope.cradle;
    userController.getAllUsers(req, res, next);
  });

  // GET /api/v1/users/:id
  userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    const { userController } = req.scope.cradle;
    userController.getUserById(req, res, next);
  });

  // POST /api/v1/users
  userRouter.post('/', validate(createUserSchema), (req: Request, res: Response, next: NextFunction) => {
    const { userController } = req.scope.cradle;
    userController.createUser(req, res, next);
  });

  // PUT /api/v1/users/:id
  userRouter.put('/:id', validate(updateUserSchema), (req: Request, res: Response, next: NextFunction) => {
    const { userController } = req.scope.cradle;
    userController.updateUser(req, res, next);
  });

  // DELETE /api/v1/users/:id
  userRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    const { userController } = req.scope.cradle;
    userController.deleteUser(req, res, next);
  });

  return userRouter;
}
