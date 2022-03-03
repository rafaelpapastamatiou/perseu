import { AddUser } from '@application/useCases/add-user';
import { AddUserSignature } from '@domain/useCases/add-user';
import { BcryptAdapter } from '@infra/crypto/bcrypt.adapter';
import { MongoUsersRepository } from '@infra/database/mongodb/repositories/mongo-users.repository';
import { UserSerializer } from '@infra/serializers/user.serializer';

export function makeAddUser(): AddUserSignature {
  const mongoUsersRepository = new MongoUsersRepository();
  const bcryptAdapter = new BcryptAdapter(10);
  const userSerializer = new UserSerializer();

  return new AddUser(mongoUsersRepository, bcryptAdapter, userSerializer);
}
