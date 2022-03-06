import { User } from '@domain/entities/user';
import { AddUserSignature } from '@domain/useCases/users/add-user';
import { mockedUser } from '@tests/domain/mocks/user.mock';

export class AddUserStub implements AddUserSignature {
  result = mockedUser;

  async execute(): Promise<User> {
    return this.result;
  }
}
