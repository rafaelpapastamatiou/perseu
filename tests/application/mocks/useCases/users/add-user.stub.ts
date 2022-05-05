import { UserDTO } from '@application/dtos/user.dto';
import { AddUser } from '@application/useCases/users/add-user';

import { mockedUser } from '@tests/domain/mocks/user.mock';

export class AddUserStub extends AddUser {
  constructor() {
    super(null, null);
  }

  result = UserDTO.fromDomain(mockedUser);

  async execute(): Promise<UserDTO> {
    return this.result;
  }
}
