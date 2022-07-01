import { UserDTO } from '@application/dtos/user.dto';
import { UsersRepository } from '@application/providers/repositories/users.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type ListUsersInterface = UseCase<[], UserDTO[]>;

export class ListUsers implements ListUsersInterface {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<UserDTO[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => UserDTO.fromDomain(user));
  }
}
