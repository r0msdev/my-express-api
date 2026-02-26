import type { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService.js';
import type { AppLogger } from '../utils/logger.js';

export class UserController {
  private userService: UserService;
  private logger: AppLogger;

  constructor(userService: UserService, logger: AppLogger, correlationId: string) {
    this.userService = userService;    
    this.logger = logger.child({ correlationId });
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      this.logger.info('Fetched all users', { count: users.length });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const user = await this.userService.getUserById(id);
      this.logger.info('Fetched user', { id });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      this.logger.info('Created new user', { userId: newUser.id });
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
      this.logger.info('Updated user', { id });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await this.userService.deleteUser(id);
      this.logger.info('Deleted user', { id });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
