import type { User } from '../models/user.js';

export class UserService {
  private users: User[] = [];
  private nextId = 1;

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  createUser(userData: Omit<User, 'id'>): User {
    const newUser: User = {
      id: String(this.nextId++),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, userData: Partial<Omit<User, 'id'>>): User | null {
    const index = this.users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const currentUser = this.users[index]!;
    this.users[index] = { ...currentUser, ...userData, id: currentUser.id };
    return this.users[index];
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.users.splice(index, 1);
    return true;
  }
}
