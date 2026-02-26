import { Router } from 'express';
import { createV1Router } from './v1/index.js';

export function createApiRouter() {
  const apiRouter = Router();

  // Mount API versions
  apiRouter.use('/v1', createV1Router());

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
