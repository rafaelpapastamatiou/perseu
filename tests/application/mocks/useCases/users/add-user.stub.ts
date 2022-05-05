import { UserDTO } from '@application/dtos/user.dto';
import {
  AddUserResult,
  AddUserSignature,
} from '@domain/useCases/users/add-user';
import { mockedUser } from '@tests/domain/mocks/user.mock';

export class AddUserStub implements AddUserSignature {
  result = UserDTO.fromDomain(mockedUser);

  async execute(): Promise<AddUserResult> {
    return this.result;
  }
}
