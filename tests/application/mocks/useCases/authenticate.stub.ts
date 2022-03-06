import {
  AuthenticateResult,
  AuthenticateSignature,
} from '@domain/useCases/users/authenticate';
import { mockedUser } from '@tests/domain/mocks/user.mock';

export class AuthenticateStub implements AuthenticateSignature {
  result = {
    accessToken: 'token',
    user: mockedUser,
  };

  async execute(): Promise<AuthenticateResult> {
    return this.result;
  }
}
