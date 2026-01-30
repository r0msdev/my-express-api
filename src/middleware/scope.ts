import type { Request, Response, NextFunction } from 'express';
import { asValue } from 'awilix';
import { randomUUID } from 'crypto';

export const scopeMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  // Get or generate correlation ID
  const correlationId = 
    (req.headers['x-correlation-id'] as string) || 
    (req.headers['x-request-id'] as string) || 
    randomUUID();
  
  // Set on request object for easy access
  req.correlationId = correlationId;
  
  // Return in response headers for client tracking
  _res.setHeader('X-Correlation-ID', correlationId);
  
  // Create a scoped container for this request
  req.scope = req.app.locals.container.createScope();
  
  // Register request-specific values BEFORE any controller resolution
  req.scope.register({
    correlationId: asValue(correlationId),
    req: asValue(req),
    res: asValue(_res),
  });
  
  // Clean up scope after response
  _res.on('finish', () => {
    req.scope?.dispose();
  });
  
  next();
};
