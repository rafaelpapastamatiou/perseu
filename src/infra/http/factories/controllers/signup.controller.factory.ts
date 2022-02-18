import { makeAuthenticate } from '@infra/factories/useCases/authenticate.factory';
import { makeCreateUser } from '@infra/factories/useCases/create-user.factory';
import { SignUpController } from '@presentation/http/controllers/signup.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeSignUpController(): Controller {
  const createUser = makeCreateUser();
  const authenticate = makeAuthenticate();

  return new SignUpController(createUser, authenticate);
}
