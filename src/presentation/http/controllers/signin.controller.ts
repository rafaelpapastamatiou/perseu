import { AuthenticateSignature } from '@domain/useCases/authenticate';
import { AuthCredentialsDTO } from '../dtos/auth-credentials.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignInController implements Controller {
  constructor(private authenticate: AuthenticateSignature) {}

  async handle({
    body,
  }: HttpRequest<AuthCredentialsDTO>): Promise<HttpResponse> {
    const { email, password } = body;

    const authenticateResult = await this.authenticate.execute({
      email,
      password,
    });

    return ok(authenticateResult);
  }
}
