import { MongoUsersRepository } from '@infra/database/mongodb/repositories/mongo-users.repository';

export function makeUsersRepository() {
  return new MongoUsersRepository();
}
