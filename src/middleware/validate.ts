import type { Request, Response, NextFunction } from 'express';
import { z, type ZodError } from 'zod';
import { logger } from '../utils/logger.js';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodError = error as ZodError<unknown>;
        logger.warn({ errors: zodError.issues }, 'Validation failed');
        res.status(400).json({
          error: 'Validation failed',
          details: zodError.issues.map(err => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      } else {
        next(error);
      }
    }
  };
};
