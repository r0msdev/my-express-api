import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { AppError } from '../errors/customErrors.js';
import { env } from '../config/env.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Handle operational errors (custom errors)
  if (err instanceof AppError) {
    logger.warn('Operational error', { 
      statusCode: err.statusCode, 
      message: err.message, 
      url: req.url, 
      method: req.method 
    });
    
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  // Handle unexpected errors
  logger.error('Unexpected error', { err, url: req.url, method: req.method });
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};
