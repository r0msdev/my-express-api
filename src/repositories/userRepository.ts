import type { User } from '../models/user.js';

// Interface defines the contract — swap implementations without touching the service layer
export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}
