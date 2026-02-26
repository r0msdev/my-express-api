import type { User } from '../models/user.js';
import type { UserRepository } from './userRepository.js';

// In-memory implementation — replace with a DB-backed class for production
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) ?? null;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const index = this.users.findIndex(user => user.id === id);

    if (index === -1) {
      return null;
    }

    const currentUser = this.users[index]!;
    this.users[index] = { ...currentUser, ...userData, id: currentUser.id, updatedAt: new Date() };
    return this.users[index]!;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);

    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.users.some(user => user.email === email);
  }
}
