import { Authenticate } from '@application/useCases/authenticate';
import { AuthenticateSignature } from '@domain/useCases/authenticate';
import { MongoUsersRepository } from '@infra/providers/database/mongodb/repositories/mongo-users.repository';
import { BcryptAdapter } from '@infra/providers/crypto/bcrypt.adapter';
import { Jwt } from '@infra/providers/jwt';

export function makeAuthenticate(): AuthenticateSignature {
  const mongoUsersRepository = new MongoUsersRepository();
  const bcryptAdapter = new BcryptAdapter(10);
  const jwtAdapter = new Jwt();

  return new Authenticate(mongoUsersRepository, bcryptAdapter, jwtAdapter);
}
