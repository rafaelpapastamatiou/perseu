import { UserDTO } from '@application/dtos/user.dto';

import {
  AuthenticateInterface,
  AuthenticateResult,
} from '@application/useCases/users/authenticate';

import { mockedUser } from '@tests/domain/mocks/user.mock';

export class AuthenticateStub implements AuthenticateInterface {
  result = {
    accessToken: 'token',
    user: UserDTO.fromDomain(mockedUser),
  };

  async execute(): Promise<AuthenticateResult> {
    return this.result;
  }
}
