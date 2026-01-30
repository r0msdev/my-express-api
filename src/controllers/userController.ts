import type { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService.js';
import type { AppLogger } from '../utils/logger.js';
import { BadRequestError } from '../errors/customErrors.js';

export class UserController {
  private userService: UserService;
  private logger: AppLogger;

  constructor(userService: UserService, logger: AppLogger, correlationId: string) {
    this.userService = userService;    
    this.logger = logger.child({ correlationId });
  }

  getAllUsers(req: Request, res: Response, next: NextFunction): void {
    try {
      const users = this.userService.getAllUsers();
      this.logger.info('Fetched all users', { count: users.length });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  getUserById(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        throw new BadRequestError('Valid ID is required');
      }
      
      const user = this.userService.getUserById(id);
      this.logger.info('Fetched user', { id });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  createUser(req: Request, res: Response, next: NextFunction): void {
    try {
      const userData = req.body;
      const newUser = this.userService.createUser(userData);
      this.logger.info('Created new user', { userId: newUser.id });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  updateUser(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        throw new BadRequestError('Valid ID is required');
      }
      
      const userData = req.body;
      const updatedUser = this.userService.updateUser(id, userData);
      this.logger.info('Updated user', { id });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  deleteUser(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        throw new BadRequestError('Valid ID is required');
      }
      
      this.userService.deleteUser(id);
      this.logger.info('Deleted user', { id });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
