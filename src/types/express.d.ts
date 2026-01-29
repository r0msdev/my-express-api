import type { AwilixContainer } from 'awilix';

declare global {
  namespace Express {
    interface Request {
      scope: AwilixContainer;
      correlationId: string;
    }
  }
}

export {};
