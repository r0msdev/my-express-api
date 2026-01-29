import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export const correlationIdMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  // Try to get correlation ID from headers, or generate new one
  req.correlationId = 
    (req.headers['x-correlation-id'] as string) || 
    (req.headers['x-request-id'] as string) || 
    randomUUID();
  
  // Return in response headers for client tracking
  _res.setHeader('X-Correlation-ID', req.correlationId);
  
  next();
};
