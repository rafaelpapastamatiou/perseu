import { Authenticate } from '@modules/auth/application/useCases/authenticate';
import { AuthenticateSignature } from '@modules/auth/domain/useCases/authenticate';
import { MongoUsersRepository } from '@modules/auth/infra/database/mongodb/repositories/mongo-users.repository';
import { BcryptAdapter } from '@core/infra/crypto/bcrypt.adapter';

export function makeAuthenticate(): AuthenticateSignature {
  const mongoUsersRepository = new MongoUsersRepository();
  const bcryptAdapter = new BcryptAdapter(10);

  return new Authenticate(mongoUsersRepository, bcryptAdapter);
}
