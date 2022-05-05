import { User } from '@domain/entities/user';

export interface AddUserSignature {
  execute(userData: AddUserParams): Promise<AddUserResult>;
}

export type AddUserParams = {
  firstName: string;

  lastName: string;

  email: string;

  password: string;
};

export type AddUserResult = Omit<User, 'password'>;
