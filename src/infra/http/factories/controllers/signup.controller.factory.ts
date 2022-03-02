import { makeAuthenticate } from '@infra/factories/useCases/authenticate.factory';
import { makeAddUser } from '@infra/factories/useCases/add-user.factory';
import { SignUpController } from '@presentation/http/controllers/signup.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeSignUpController(): Controller {
  const addUser = makeAddUser();
  const authenticate = makeAuthenticate();

  return new SignUpController(addUser, authenticate);
}
