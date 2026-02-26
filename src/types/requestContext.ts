import type { AppLogger } from '../utils/logger.js';

/**
 * Carries per-request context through the DI container.
 * Extend this interface as the app grows (e.g. add `user` after auth middleware).
 */
export interface RequestContext {
  correlationId: string;
  logger: AppLogger; // already child'd with correlationId — ready to use directly
}
