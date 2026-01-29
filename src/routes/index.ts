import { Router } from 'express';
import { createV1Router } from './v1/index.js';
import type { Cradle } from '../config/container.js';

export function createApiRouter(container: { cradle: Cradle }) {
  const apiRouter = Router();

  // Mount API versions
  apiRouter.use('/v1', createV1Router(container));

  // API root
  apiRouter.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the API',
      versions: {
        v1: '/api/v1',
      },
      health: '/health'
    });
  });

  return apiRouter;
}
