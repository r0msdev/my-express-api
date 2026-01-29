import type { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService.js';
import { logger } from '../utils/logger.js';
import { BadRequestError } from '../errors/customErrors.js';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getAllUsers(req: Request, res: Response, next: NextFunction): void {
    try {
      const users = this.userService.getAllUsers();
      logger.info({ count: users.length }, 'Fetched all users');
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
      logger.info({ id }, 'Fetched user');
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  createUser(req: Request, res: Response, next: NextFunction): void {
    try {
      const userData = req.body;
      const newUser = this.userService.createUser(userData);
      logger.info({ userId: newUser.id }, 'Created new user');
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
      logger.info({ id }, 'Updated user');
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
      logger.info({ id }, 'Deleted user');
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
