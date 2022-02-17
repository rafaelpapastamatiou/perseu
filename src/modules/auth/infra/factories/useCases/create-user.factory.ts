import { CreateUser } from '@modules/auth/application/useCases/create-user';
import { CreateUserSignature } from '@modules/auth/domain/useCases/create-user';
import { MongoUsersRepository } from '@modules/auth/infra/database/mongodb/repositories/mongo-users.repository';
import { BcryptAdapter } from '@core/infra/crypto/bcrypt.adapter';

export function makeCreateUser(): CreateUserSignature {
  const mongoUsersRepository = new MongoUsersRepository();
  const bcryptAdapter = new BcryptAdapter(10);

  return new CreateUser(mongoUsersRepository, bcryptAdapter);
}
