import { UsersRepository } from '@application/providers/repositories/users.repository';
import { User } from '@domain/entities/user';
import { mockedUserId } from '@tests/domain/mocks/user.mock';

export class UsersRepositoryStub implements UsersRepository {
  async findById(): Promise<User> {
    return undefined;
  }

  async findByEmail(): Promise<User> {
    return undefined;
  }

  async add(): Promise<void> {
    return;
  }

  async generateId(): Promise<string> {
    return mockedUserId;
  }
}
