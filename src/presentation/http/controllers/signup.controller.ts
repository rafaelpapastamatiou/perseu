import { AuthenticateSignature } from '@domain/useCases/authenticate';
import { AddUserSignature } from '@domain/useCases/add-user';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';
import { CreateUserDTO } from '../dtos/create-user.dto';

export class SignUpController implements Controller {
  constructor(
    private addUser: AddUserSignature,
    private authenticate: AuthenticateSignature,
  ) {}

  async handle({ body }: HttpRequest<CreateUserDTO>): Promise<HttpResponse> {
    await this.addUser.execute(body);

    const authenticationResult = await this.authenticate.execute({
      email: body.email,
      password: body.password,
    });

    return ok(authenticationResult);
  }
}
