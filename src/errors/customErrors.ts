import type { core } from 'zod';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(400, message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(409, message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class ValidationError extends AppError {
  public details: { path: string; message: string }[];

  constructor(issues: core.$ZodIssue[] = []) {
    super(422, 'Validation failed');
    this.details = issues.map(issue => ({
      path: issue.path.map(String).join('.'),
      message: issue.message,
    }));
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
