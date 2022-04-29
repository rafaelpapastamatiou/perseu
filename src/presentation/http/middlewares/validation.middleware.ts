import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { HttpRequest, HttpResponse } from '../protocols/http';
import { Middleware } from '../protocols/middleware';
import { badRequest, ok, serverError } from '../helpers/http-helpers';

export class ValidationMiddleware implements Middleware {
  constructor(private dto: ClassConstructor<any>) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, query } = request;

      const data = {
        ...body,
        ...query,
      };

      const errors: string[] = [];

      const dtoObj = plainToInstance(this.dto, data);

      const dtoErrors = await validate(dtoObj);

      errors.push(
        ...dtoErrors.map((err) => Object.values(err.constraints).join(', ')),
      );

      if (errors.length > 0) {
        return badRequest({ body: { errors } });
      }

      return ok({});
    } catch (err) {
      return serverError({ body: err });
    }
  }
}
