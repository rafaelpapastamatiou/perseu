import { AuthenticateSignature } from '@modules/auth/domain/useCases/authenticate';
import { AddUserSignature } from '@modules/auth/domain/useCases/add-user';
import { ok } from '@core/presentation/helpers/http-helpers';
import { Controller } from '@core/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@core/presentation/protocols/http';
import { CreateUserDTO } from '../../dtos/create-user.dto';

export class SignUpController implements Controller {
  constructor(
    private addUser: AddUserSignature,
    private authenticate: AuthenticateSignature,
  ) {}

  async handle({ body }: HttpRequest<CreateUserDTO>): Promise<HttpResponse> {
    await this.addUser.execute(body);

    const authenticationResult = await this.authenticate.execute({
      usernameOrEmail: body.username,
      password: body.password,
    });

    return ok(authenticationResult);
  }
}
