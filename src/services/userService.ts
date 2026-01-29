import type { User } from '../models/user.js';
import { UserRepository } from '../repositories/userRepository.js';
import { NotFoundError, ConflictError } from '../errors/customErrors.js';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers(): User[] {
    return this.userRepository.findAll();
  }

  getUserById(id: string): User {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  createUser(userData: Omit<User, 'id'>): User {
    // Business logic: Check if email already exists
    if (this.userRepository.existsByEmail(userData.email)) {
      throw new ConflictError('User with this email already exists');
    }
    
    return this.userRepository.create(userData);
  }

  updateUser(id: string, userData: Partial<Omit<User, 'id'>>): User {
    // Business logic: Check if email is being changed to an existing one
    if (userData.email && this.userRepository.existsByEmail(userData.email)) {
      const existingUser = this.userRepository.findById(id);
      if (existingUser?.email !== userData.email) {
        throw new ConflictError('User with this email already exists');
      }
    }

    const updatedUser = this.userRepository.update(id, userData);
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    
    return updatedUser;
  }

  deleteUser(id: string): void {
    const deleted = this.userRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError('User not found');
    }
  }
}
