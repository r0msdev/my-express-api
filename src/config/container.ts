import { createContainer, asClass, InjectionMode } from 'awilix';
import { UserRepository } from '../repositories/userRepository.js';
import { UserService } from '../services/userService.js';
import { UserController } from '../controllers/userController.js';

export interface Cradle {
  userRepository: UserRepository;
  userService: UserService;
  userController: UserController;
}

export function configureContainer() {
  const container = createContainer<Cradle>({
    injectionMode: InjectionMode.CLASSIC,
  });

  // Register repositories
  container.register({
    userRepository: asClass(UserRepository).singleton(),
  });

  // Register services
  container.register({
    userService: asClass(UserService).singleton(),
  });

  // Register controllers
  container.register({
    userController: asClass(UserController).scoped(),
  });

  return container;
}
