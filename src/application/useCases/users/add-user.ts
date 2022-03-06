import {
  AddUserSignature,
  AddUserParams,
  AddUserResult,
} from '@domain/useCases/users/add-user';
import { Hasher } from '@application/providers/crypto/hasher';
import { User } from '@domain/entities/user';

import { EmailAlreadyInUseException } from '../../exceptions/email-already-in-use.exception';
import { UsersRepository } from '../../providers/repositories/users.repository';
import { Serializer } from '@application/providers/serializer';

export class AddUser implements AddUserSignature {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: Hasher,
    private serializer: Serializer,
  ) {}

  async execute(userData: AddUserParams): Promise<AddUserResult> {
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

    return this.serializer.serialize(user);
  }
}