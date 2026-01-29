import { createContainer, asClass, asFunction, InjectionMode } from 'awilix';
import { UserRepository } from '../repositories/userRepository.js';
import { UserService } from '../services/userService.js';
import { UserController } from '../controllers/userController.js';
import { logger } from '../utils/logger.js';

export interface Cradle {
  userRepository: UserRepository;
  userService: UserService;
  userController: UserController;
  logger: typeof logger;
  correlationId: string;
}

export function configureContainer() {
  const container = createContainer<Cradle>({
    injectionMode: InjectionMode.CLASSIC,
  });

  // Register repositories (singleton - shared across all requests)
  container.register({
    userRepository: asClass(UserRepository).singleton(),
  });

  // Register services (scoped - per request)
  container.register({
    userService: asClass(UserService).scoped(),
  });

  // Register controllers (scoped - per request)
  container.register({
    userController: asClass(UserController).scoped(),
  });

  // Register logger (scoped - per request with correlation ID)
  container.register({
    logger: asFunction(({ correlationId }: Cradle) => {
      return logger.child({
        correlationId: correlationId || 'unknown',
      });
    }).scoped(),
  });

  return container;
}
