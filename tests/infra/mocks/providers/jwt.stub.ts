import {
  JsonWebToken,
  JsonWebTokenPayload,
} from '@application/providers/json-web-token';
import { mockedUser } from '@tests/domain/mocks/user.mock';

export class JwtStub implements JsonWebToken {
  async sign(): Promise<string> {
    return 'fake-token';
  }

  async verify(): Promise<false | JsonWebTokenPayload> {
    return {
      userId: mockedUser.id,
      ...mockedUser,
    };
  }
}
