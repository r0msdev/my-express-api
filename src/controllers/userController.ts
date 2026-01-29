import type { Request, Response } from 'express';
import { UserService } from '../services/userService.js';
import { logger } from '../utils/logger.js';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers(req: Request, res: Response): void {
    try {
      const users = this.userService.getAllUsers();
      logger.info({ count: users.length }, 'Fetched all users');
      res.status(200).json(users);
    } catch (error) {
      logger.error({ error }, 'Error fetching users');
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  getUserById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'Valid ID is required' });
        return;
      }
      const user = this.userService.getUserById(id);
      
      if (!user) {
        logger.warn({ id }, 'User not found');
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      logger.info({ id }, 'Fetched user');
      res.status(200).json(user);
    } catch (error) {
      const { id } = req.params;
      logger.error({ error, id }, 'Error fetching user');
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  createUser(req: Request, res: Response): void {
    try {
      const userData = req.body;
      const newUser = this.userService.createUser(userData);
      logger.info({ userId: newUser.id }, 'Created new user');
      res.status(201).json(newUser);
    } catch (error) {
      logger.error({ error }, 'Error creating user');
      res.status(400).json({ error: 'Failed to create user' });
    }
  }

  updateUser(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'Valid ID is required' });
        return;
      }
      const userData = req.body;
      const updatedUser = this.userService.updateUser(id, userData);
      
      if (!updatedUser) {
        logger.warn({ id }, 'User not found for update');
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      logger.info({ id }, 'Updated user');
      res.status(200).json(updatedUser);
    } catch (error) {
      const { id } = req.params;
      logger.error({ error, id }, 'Error updating user');
      res.status(400).json({ error: 'Failed to update user' });
    }
  }

  deleteUser(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'Valid ID is required' });
        return;
      }
      const deleted = this.userService.deleteUser(id);
      
      if (!deleted) {
        logger.warn({ id }, 'User not found for deletion');
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      logger.info({ id }, 'Deleted user');
      res.status(204).send();
    } catch (error) {
      const { id } = req.params;
      logger.error({ error, id }, 'Error deleting user');
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}
