import { FastifyReply, FastifyRequest } from 'fastify';

import { DomainException } from '@domain/exceptions/domain-exception';
import { HttpException } from '@presentation/http/exceptions/http.exception';
import { getHttpExceptionCodeFromDomainException } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest } from '@presentation/http/protocols/http';

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
