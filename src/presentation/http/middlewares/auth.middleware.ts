import {
  JsonWebToken,
  JsonWebTokenPayload,
} from '@application/providers/json-web-token';
import {
  HttpExceptionResponseBody,
  ok,
  unauthorized,
} from '../helpers/http-helpers';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Middleware } from '../protocols/middleware';

type AuthResult = {
  userId: string;
};

export class AuthMiddleware implements Middleware {
  constructor(private jwt: JsonWebToken) {}

  async handle({
    headers,
  }: HttpRequest): Promise<
    HttpResponse<AuthResult | HttpExceptionResponseBody>
  > {
    const token = headers['authorization'] || headers['Authorization'];

    if (!token) {
      return unauthorized({
        body: {
          error: 'Authorization token not found.',
        },
      });
    }

    const decoded = await this.jwt.verify(token as string);

    if (!decoded) {
      return unauthorized({
        body: {
          error: 'Invalid token.',
        },
      });
    }

    const { userId } = decoded as JsonWebTokenPayload;

    return ok({
      userId,
    });
  }
}
