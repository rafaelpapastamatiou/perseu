import { User } from '../entities/user';

export interface AuthenticateSignature {
  execute(credentials: AuthenticateParams): Promise<AuthenticateResult>;
}

export type AuthenticateParams = {
  email: string;
  password: string;
};

export type AuthenticateResult = {
  accessToken: string;
  user: User;
};