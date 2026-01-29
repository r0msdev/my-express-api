import type { Request, Response, NextFunction } from 'express';
import type { AwilixContainer } from 'awilix';
import { asValue } from 'awilix';

export const createScopeMiddleware = (container: AwilixContainer) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    // Create a scoped container for this request
    req.scope = container.createScope();
    
    // Register request-specific values
    req.scope.register({
      correlationId: asValue(req.correlationId),
      req: asValue(req),
      res: asValue(_res),
    });
    
    // Clean up scope after response
    _res.on('finish', () => {
      req.scope?.dispose();
    });
    
    next();
  };
};
