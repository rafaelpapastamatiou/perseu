import { ListUsers } from '@application/useCases/users/list-users';
import { makeUsersRepository } from '@main/factories/providers/repositories/users.repository';

export function makeListUsers() {
  const usersRepository = makeUsersRepository();

  return new ListUsers(usersRepository);
}
