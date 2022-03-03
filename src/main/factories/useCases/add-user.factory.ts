import { AddUser } from '@application/useCases/add-user';
import { AddUserSignature } from '@domain/useCases/add-user';
import { BcryptAdapter } from '@infra/crypto/bcrypt.adapter';
import { MongoUsersRepository } from '@infra/database/mongodb/repositories/mongo-users.repository';

export function makeAddUser(): AddUserSignature {
  const mongoUsersRepository = new MongoUsersRepository();
  const bcryptAdapter = new BcryptAdapter(10);

  return new AddUser(mongoUsersRepository, bcryptAdapter);
}
