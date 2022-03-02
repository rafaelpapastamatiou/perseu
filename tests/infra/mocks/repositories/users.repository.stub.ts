import { UsersRepository } from '@application/providers/repositories/users.repository';
import { User } from '@domain/entities/user';
import { mockedUserId } from '@tests/domain/mocks/user.mock';

export class UsersRepositoryStub implements UsersRepository {
  async findByUsernameOrEmail(): Promise<User> {
    return undefined;
  }
  async findById(): Promise<User> {
    return undefined;
  }

  async findByEmail(): Promise<User> {
    return undefined;
  }

  async findByUsername(): Promise<User> {
    return undefined;
  }

  async add(user: User): Promise<User> {
    return user;
  }

  async generateId(): Promise<string> {
    return mockedUserId;
  }
}
