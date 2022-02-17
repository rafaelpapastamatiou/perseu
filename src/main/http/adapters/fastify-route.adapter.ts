import { FastifyReply, FastifyRequest } from 'fastify';

import { DomainException } from '@core/domain/exceptions/domain-exception';
import { HttpException } from '@core/presentation/exceptions/http.exception';
import { getHttpExceptionCodeFromDomainException } from '@core/presentation/helpers/http-helpers';
import { Controller } from '@core/presentation/protocols/controller';
import { HttpRequest } from '@core/presentation/protocols/http';

export const adaptFastifyRoute = (controller: Controller) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const request: HttpRequest = {
      body: { ...((req.body as Record<string, unknown>) || {}) },
      params: { ...((req.params as Record<string, unknown>) || {}) },
    };

    try {
      const httpResponse = await controller.handle(request);

      reply.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (err) {
      if (err instanceof DomainException) {
        reply.status(getHttpExceptionCodeFromDomainException(err.code)).send({
          error: err.message,
        });
      } else if (err instanceof HttpException) {
        reply.status(err.code).send({
          error: err.message,
        });
      } else {
        reply.status(500).send({
          error: 'Internal Server Error.',
        });
      }
    }
  };
};
