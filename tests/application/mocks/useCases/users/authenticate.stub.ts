import { UserDTO } from '@application/dtos/user.dto';

import {
  Authenticate,
  AuthenticateResult,
} from '@application/useCases/users/authenticate';

import { mockedUser } from '@tests/domain/mocks/user.mock';

export class AuthenticateStub extends Authenticate {
  constructor() {
    super(null, null, null);
  }

  result = {
    accessToken: 'token',
    user: UserDTO.fromDomain(mockedUser),
  };

  async execute(): Promise<AuthenticateResult> {
    return this.result;
  }
}
