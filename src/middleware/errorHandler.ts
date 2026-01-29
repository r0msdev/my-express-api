import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { AppError } from '../errors/customErrors.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Handle operational errors (custom errors)
  if (err instanceof AppError) {
    logger.warn({ 
      statusCode: err.statusCode, 
      message: err.message, 
      url: req.url, 
      method: req.method 
    }, 'Operational error');
    
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  // Handle unexpected errors
  logger.error({ err, url: req.url, method: req.method }, 'Unexpected error');
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};
