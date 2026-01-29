import { Router } from 'express';
import { userRouter } from './users.js';

export const apiRouter = Router();

// Mount route modules
apiRouter.use('/users', userRouter);

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
