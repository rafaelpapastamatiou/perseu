import { UserDTO } from '@application/dtos/user.dto';
import { AddUserInterface } from '@application/useCases/users/add-user';

import { mockedUser } from '@tests/domain/mocks/user.mock';

export class AddUserStub implements AddUserInterface {
  result = UserDTO.fromDomain(mockedUser);

  async execute(): Promise<UserDTO> {
    return this.result;
  }
}
