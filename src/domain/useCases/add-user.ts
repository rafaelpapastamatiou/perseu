import { User } from '../entities/user';

export interface AddUserSignature {
  execute(userData: AddUserParams): Promise<User>;
}

export type AddUserParams = {
  firstName: string;

  lastName: string;

  email: string;

  username: string;

  password: string;
};

export type AddUserResult = User;
