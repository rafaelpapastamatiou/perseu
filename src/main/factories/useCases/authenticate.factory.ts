import { Authenticate } from '@application/useCases/users/authenticate';
import { AuthenticateSignature } from '@domain/useCases/users/authenticate';
import { BcryptAdapter } from '@infra/crypto/bcrypt.adapter';
import { MongoUsersRepository } from '@infra/database/mongodb/repositories/mongo-users.repository';
import { Jwt } from '@infra/jwt';

export function makeAuthenticate(): AuthenticateSignature {
  const mongoUsersRepository = new MongoUsersRepository();
  const bcryptAdapter = new BcryptAdapter(10);
  const jwtAdapter = new Jwt();

  return new Authenticate(mongoUsersRepository, bcryptAdapter, jwtAdapter);
}
