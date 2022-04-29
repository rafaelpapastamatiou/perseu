import { AuthenticateSignature } from '@domain/useCases/users/authenticate';
import { AddUserSignature } from '@domain/useCases/users/add-user';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';
import { SignUpRequestDTO } from '../dtos/signup.dto';
import { SignInResponseDTO } from '../dtos/signin.dto';

export class SignUpController implements Controller {
  constructor(
    private addUser: AddUserSignature,
    private authenticate: AuthenticateSignature,
  ) {}

  async handle({
    body,
  }: HttpRequest<SignUpRequestDTO>): Promise<HttpResponse<SignInResponseDTO>> {
    await this.addUser.execute(body);

    const authenticationResult = await this.authenticate.execute({
      email: body.email,
      password: body.password,
    });

    return ok<SignInResponseDTO>({
      body: authenticationResult,
    });
  }
}
