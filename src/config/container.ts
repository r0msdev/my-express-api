import { createContainer, asClass, asValue, InjectionMode } from 'awilix';
import { InMemoryUserRepository } from '../repositories/inMemoryUserRepository.js';
import { UserService } from '../services/userService.js';
import { UserController } from '../controllers/userController.js';
import { logger } from '../utils/logger.js';
import type { UserRepository } from '../repositories/userRepository.js';
import type { RequestContext } from '../types/requestContext.js';

export interface Cradle {
  userRepository: UserRepository;
  userService: UserService;
  userController: UserController;
  logger: typeof logger;
  correlationId: string;
  context: RequestContext;
}

export function configureContainer() {
  const container = createContainer<Cradle>({
    injectionMode: InjectionMode.CLASSIC,
  });

  // Register repositories (singleton - shared across all requests)
  container.register({
    userRepository: asClass(InMemoryUserRepository).singleton(),
  });

  // Register services (scoped - per request)
  container.register({
    userService: asClass(UserService).scoped(),
  });

  // Register controllers (scoped - per request)
  container.register({
    userController: asClass(UserController).scoped(),
  });

  // Register base logger
  container.register({
    logger: asValue(logger),
  });

  return container;
}
