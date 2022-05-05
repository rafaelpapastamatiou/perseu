import { Hasher } from '@application/providers/crypto/hasher';
import { CreateUserPayload, User } from '@domain/entities/user';

import { EmailAlreadyInUseException } from '../../exceptions/email-already-in-use.exception';
import { UsersRepository } from '../../providers/repositories/users.repository';
import { UserDTO } from '@application/dtos/user.dto';
import { UseCase } from '@domain/interfaces/use-case';

export class AddUser implements UseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: Hasher,
  ) {}

  async execute(userData: CreateUserPayload): Promise<UserDTO> {
    const { email, password } = userData;

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUseException();
    }

    const hashedPassword = await this.hasher.hash(password);

    const id = await this.usersRepository.generateId();

    if (!id) {
      throw new Error('Error generating id for user.');
    }

    const user = User.create(id, { ...userData, password: hashedPassword });

    if (!user) {
      throw new Error('Error creating new user.');
    }

    await this.usersRepository.add(user);

    return UserDTO.fromDomain(user);
  }
}
