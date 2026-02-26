import type { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService.js';
import type { RequestContext } from '../types/requestContext.js';

export class UserController {
  private userService: UserService;
  private context: RequestContext;

  constructor(userService: UserService, context: RequestContext) {
    this.userService = userService;
    this.context = context;
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      this.context.logger.info('Fetched all users', { count: users.length });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const user = await this.userService.getUserById(id);
      this.context.logger.info('Fetched user', { id });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      this.context.logger.info('Created new user', { userId: newUser.id });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const userData = req.body;
      const updatedUser = await this.userService.updateUser(id, userData);
      this.context.logger.info('Updated user', { id });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await this.userService.deleteUser(id);
      this.context.logger.info('Deleted user', { id });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
