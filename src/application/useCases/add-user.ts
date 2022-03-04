import {
  AddUserSignature,
  AddUserParams,
  AddUserResult,
} from '@domain/useCases/add-user';
import { Hasher } from '@application/providers/crypto/hasher';
import { User } from '@domain/entities/user';

import { EmailAlreadyInUseException } from '../exceptions/email-already-in-use.exception';
import { UsersRepository } from '../providers/repositories/users.repository';
import { Serializer } from '@application/providers/serializer';

export class AddUser implements AddUserSignature {
  constructor(
    private repository: UsersRepository,
    private hasher: Hasher,
    private serializer: Serializer,
  ) {}

  async execute(userData: AddUserParams): Promise<AddUserResult> {
    const { email, password } = userData;

    const emailAlreadyInUse = await this.repository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUseException();
    }

    const hashedPassword = await this.hasher.hash(password);

    const id = await this.repository.generateId();

    if (!id) {
      throw new Error('Erro ao gerar novo ID para o usuário.');
    }

    const user = User.create(id, { ...userData, password: hashedPassword });

    if (!user) {
      throw new Error('Erro ao cadastrar usuário.');
    }

    await this.repository.add(user);

    return this.serializer.serialize(user);
  }
}
