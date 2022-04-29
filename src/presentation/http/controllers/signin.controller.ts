import { AuthenticateSignature } from '@domain/useCases/users/authenticate';
import { AuthenticateRequestDTO } from '../dtos/authentication.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignInController implements Controller {
  constructor(private authenticate: AuthenticateSignature) {}

  async handle({
    body,
  }: HttpRequest<AuthenticateRequestDTO>): Promise<HttpResponse> {
    const { email, password } = body;

    const authenticateResult = await this.authenticate.execute({
      email,
      password,
    });

    return ok({
      body: authenticateResult,
    });
  }
}
