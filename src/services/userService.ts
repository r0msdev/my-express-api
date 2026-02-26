import { randomUUID } from 'crypto';
import type { User } from '../models/user.js';
import type { UserRepository } from '../repositories/userRepository.js';
import { NotFoundError, ConflictError } from '../errors/customErrors.js';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    if (await this.userRepository.existsByEmail(userData.email)) {
      throw new ConflictError('User with this email already exists');
    }

    const user: User = {
      id: randomUUID(),
      ...userData,
      createdAt: new Date(),
    };

    return this.userRepository.create(user);
  }

  async updateUser(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    const existingUser = await this.getUserById(id);

    if (userData.email && userData.email !== existingUser.email) {
      if (await this.userRepository.existsByEmail(userData.email)) {
        throw new ConflictError('User with this email already exists');
      }
    }

    return (await this.userRepository.update(id, userData))!;
  }

  async deleteUser(id: string): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError('User not found');
    }
  }
}
