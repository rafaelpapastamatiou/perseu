import { FastifyReply, FastifyRequest } from 'fastify';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { DomainException } from '@domain/exceptions/domain-exception';
import { HttpException } from '@presentation/http/exceptions/http.exception';
import { getHttpExceptionCodeFromDomainException } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest } from '@presentation/http/protocols/http';

export const adaptFastifyRoute = (
  controller: Controller,
  dto: ClassConstructor<any> = null,
) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const request: HttpRequest = {
      body: { ...((req.body as Record<string, unknown>) || {}) },
      params: { ...((req.params as Record<string, unknown>) || {}) },
    };

    try {
      const errors: string[] = [];

      if (dto) {
        const dtoObj = plainToInstance(dto, request.body);

        const dtoErrors = await validate(dtoObj);

        errors.push(
          ...dtoErrors.map((err) => Object.values(err.constraints).join(', ')),
        );
      }

      if (errors.length > 0) {
        return reply.status(400).send({
          errors,
        });
      }

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
        console.log(err);

        reply.status(500).send({
          error: 'Internal Server Error.',
        });
      }
    }
  };
};
