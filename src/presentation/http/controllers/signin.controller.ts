import { Authenticate } from '@application/useCases/users/authenticate';
import { SignInRequestDTO, SignInResponseDTO } from '../dtos/signin.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignInController implements Controller {
  constructor(private authenticate: Authenticate) {}

  async handle({
    body,
  }: HttpRequest<SignInRequestDTO>): Promise<HttpResponse<SignInResponseDTO>> {
    const { email, password } = body;

    const authenticateResult = await this.authenticate.execute({
      email,
      password,
    });

    return ok<SignInResponseDTO>({
      body: authenticateResult,
    });
  }
}
