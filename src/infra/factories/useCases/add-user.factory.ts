import { AddUser } from '@application/useCases/add-user';
import { AddUserSignature } from '@domain/useCases/add-user';
import { MongoUsersRepository } from '@infra/providers/database/mongodb/repositories/mongo-users.repository';
import { BcryptAdapter } from '@infra/providers/crypto/bcrypt.adapter';

export function makeAddUser(): AddUserSignature {
  const mongoUsersRepository = new MongoUsersRepository();
  const bcryptAdapter = new BcryptAdapter(10);

  return new AddUser(mongoUsersRepository, bcryptAdapter);
}
