import {
  AddUserSignature,
  AddUserParams,
  AddUserResult,
} from '@modules/auth/domain/useCases/add-user';
import { Hasher } from '@core/application/providers/crypto/hasher';
import { User } from '@modules/auth/domain/entities/user';

import { EmailAlreadyInUseException } from '../exceptions/email-already-in-use.exception';
import { UsernameAlreadyInUseException } from '../exceptions/username-already-in-use.exception';
import { UsersRepository } from '../repositories/users.repository';

export class AddUser implements AddUserSignature {
  constructor(private repository: UsersRepository, private hasher: Hasher) {}

  async execute(userData: AddUserParams): Promise<AddUserResult> {
    const { email, username, password } = userData;

    const emailAlreadyInUse = await this.repository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUseException();
    }

    const usernameAlreadyInUse = await this.repository.findByUsername(username);

    if (usernameAlreadyInUse) {
      throw new UsernameAlreadyInUseException();
    }

    const hashedPassword = await this.hasher.hash(password);

    const id = await this.repository.generateId();

    if (!id) {
      throw new Error('Erro ao gerar novo ID para o usuário.');
    }

    const user = User.create(id, { ...userData, password: hashedPassword });

    await this.repository.add(user);

    if (!user) {
      throw new Error('Erro ao cadastrar usuário.');
    }

    return user;
  }
}
