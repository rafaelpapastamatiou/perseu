import { makeAuthenticate } from '@main/factories/useCases/authenticate.factory';
import { Controller } from '@presentation/http/protocols/controller';
import { SignInController } from '@presentation/http/controllers/signin.controller';

export function makeSignInController(): Controller {
  const authenticate = makeAuthenticate();

  return new SignInController(authenticate);
}
