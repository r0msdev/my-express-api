import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createApiRouter } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { configureContainer } from './config/container.js';
import { scopeMiddleware } from './middleware/scope.js';
import { swaggerDocument, swaggerOptions } from './config/swagger.js';

export function createApp() {
  const app = express();

  // Configure DI container
  const container = configureContainer();
  app.locals.container = container;

  // Middleware (order matters!)
  app.use(scopeMiddleware); // Create request scope with correlation ID
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

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
