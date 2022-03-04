import { Request, Response } from 'express';

import { DomainException } from '@domain/exceptions/domain-exception';
import { getHttpExceptionCodeFromDomainException } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest } from '@presentation/http/protocols/http';

export const adaptExpressRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request: HttpRequest = {
      body: { ...((req.body as Record<string, unknown>) || {}) },
      params: { ...((req.params as Record<string, unknown>) || {}) },
    };

    try {
      const httpResponse = await controller.handle(request);

      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (err) {
      if (err instanceof DomainException) {
        res.status(getHttpExceptionCodeFromDomainException(err.code)).send({
          error: err.message,
        });
      } else {
        console.log(err);

        res.status(500).send({
          error: 'Internal Server Error.',
        });
      }
    }
  };
};
