import type { User } from '../models/user.js';

export class UserRepository {
  private users: User[] = [];
  private nextId = 1;

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  create(userData: Omit<User, 'id'>): User {
    const newUser: User = {
      id: String(this.nextId++),
      ...userData,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, userData: Partial<Omit<User, 'id'>>): User | null {
    const index = this.users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const currentUser = this.users[index]!;
    this.users[index] = { ...currentUser, ...userData, id: currentUser.id, updatedAt: new Date() };
    return this.users[index];
  }

  delete(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.users.splice(index, 1);
    return true;
  }

  existsByEmail(email: string): boolean {
    return this.users.some(user => user.email === email);
  }
}
