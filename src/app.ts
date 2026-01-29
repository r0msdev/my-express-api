import express from 'express';
import { createApiRouter } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { configureContainer } from './config/container.js';
import { correlationIdMiddleware } from './middleware/correlationId.js';
import { createScopeMiddleware } from './middleware/scope.js';

export function createApp() {
  const app = express();

  // Configure DI container
  const container = configureContainer();

  // Middleware (order matters!)
  app.use(correlationIdMiddleware); // Add correlation ID
  app.use(createScopeMiddleware(container)); // Create request scope
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api', createApiRouter(container));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Error handling middleware (should be last)
  app.use(errorHandler);

  return app;
}
