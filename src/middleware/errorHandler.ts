import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { AppError, ValidationError } from '../errors/customErrors.js';
import { env } from '../config/env.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Use request-scoped logger so correlation ID appears in every error log
  const scopedLogger = req.scope?.cradle.logger ?? logger;

  // Handle validation errors — include field-level details in response
  if (err instanceof ValidationError) {
    scopedLogger.warn('Validation error', {
      details: err.details,
      url: req.url,
      method: req.method,
    });
    res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
    return;
  }

  // Handle other operational errors
  if (err instanceof AppError) {
    scopedLogger.warn('Operational error', {
      statusCode: err.statusCode,
      message: err.message,
      url: req.url,
      method: req.method,
    });
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  // Handle unexpected errors
  scopedLogger.error('Unexpected error', { err, url: req.url, method: req.method });

  res.status(500).json({
    error: 'Internal Server Error',
    message: env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
};
