import { Comparer } from '@application/providers/crypto/comparer';
import { JsonWebToken } from '@application/providers/json-web-token';
import {
  AuthenticateSignature,
  AuthenticateParams,
  AuthenticateResult,
} from '@domain/useCases/authenticate';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

import { UsersRepository } from '../providers/repositories/users.repository';

export class Authenticate implements AuthenticateSignature {
  constructor(
    private usersRepository: UsersRepository,
    private comparer: Comparer,
    private jwt: JsonWebToken,
  ) {}

  async execute(credentials: AuthenticateParams): Promise<AuthenticateResult> {
    const user = await this.usersRepository.findByUsernameOrEmail(
      credentials.usernameOrEmail,
    );

    if (!user) throw new InvalidCredentialsException();

    const passwordMatches = await this.comparer.compare(
      credentials.password,
      user.password,
    );

    if (!passwordMatches) throw new InvalidCredentialsException();

    const token = await this.jwt.sign({
      userId: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return {
      accessToken: token,
      user,
    };
  }
}
