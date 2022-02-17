import { makeAuthenticate } from '@modules/auth/infra/factories/useCases/authenticate.factory';
import { makeCreateUser } from '@modules/auth/infra/factories/useCases/create-user.factory';
import { SignUpController } from '@modules/auth/presentation/http/controllers/signup.controller';
import { Controller } from '@core/presentation/protocols/controller';

export function makeSignUpController(): Controller {
  const createUser = makeCreateUser();
  const authenticate = makeAuthenticate();

  return new SignUpController(createUser, authenticate);
}
