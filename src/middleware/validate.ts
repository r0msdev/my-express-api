import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../errors/customErrors.js';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      // Write back parsed value so transforms/defaults/coercions take effect
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ValidationError(error.issues));
      } else {
        next(error);
      }
    }
  };
};
