import { User } from '@domain/entities/user';

export interface AuthenticateSignature {
  execute(credentials: AuthenticateParams): Promise<AuthenticateResult>;
}

export type AuthenticateParams = {
  email: string;
  password: string;
};

export type AuthenticateResult = {
  accessToken: string;
  user: Omit<User, 'password'>;
};
