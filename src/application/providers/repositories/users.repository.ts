import { User } from '@domain/entities/user';

export interface UsersRepository {
  find(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  add(user: User): Promise<void>;
  generateId(): Promise<string>;
}
