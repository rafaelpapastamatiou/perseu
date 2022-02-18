import { User } from '@domain/entities/user';

export interface UsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByUsernameOrEmail(username: string): Promise<User | undefined>;
  add(user: User): Promise<User>;
  generateId(): Promise<string>;
}
