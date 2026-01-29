import { Router } from 'express';
import { createUserRouter } from './users.js';
import type { Cradle } from '../config/container.js';

export function createApiRouter(container: { cradle: Cradle }) {
  const apiRouter = Router();

  // Mount route modules
  apiRouter.use('/users', createUserRouter(container));

  // Root API endpoint
  apiRouter.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the API',
      version: '1.0.0',
      endpoints: {
        users: '/api/users',
        health: '/health'
      }
    });
  });

  return apiRouter;
}
