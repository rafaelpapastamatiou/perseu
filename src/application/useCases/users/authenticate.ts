import { InvalidCredentialsException } from '@application/exceptions/invalid-credentials.exception';
import { Comparer } from '@application/providers/crypto/comparer';
import { JsonWebToken } from '@application/providers/json-web-token';
import { UsersRepository } from '@application/providers/repositories/users.repository';
import { Serializer } from '@application/providers/serializer';
import {
  AuthenticateSignature,
  AuthenticateParams,
  AuthenticateResult,
} from '@domain/useCases/users/authenticate';

export class Authenticate implements AuthenticateSignature {
  constructor(
    private usersRepository: UsersRepository,
    private comparer: Comparer,
    private jwt: JsonWebToken,
    private serializer: Serializer,
  ) {}

  async execute(credentials: AuthenticateParams): Promise<AuthenticateResult> {
    const user = await this.usersRepository.findByEmail(credentials.email);

    if (!user) throw new InvalidCredentialsException();

    const passwordMatches = await this.comparer.compare(
      credentials.password,
      user.password,
    );

    if (!passwordMatches) throw new InvalidCredentialsException();

    const token = await this.jwt.sign({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return {
      accessToken: token,
      user: this.serializer.serialize(user),
    };
  }
}
