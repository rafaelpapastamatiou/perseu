import { DomainExceptionCodes } from '@domain/enums/domain-exception-codes.enum';
import { HttpResponse } from '@presentation/http/protocols/http';

export function getHttpExceptionCodeFromDomainException(
  domainExceptionCode: DomainExceptionCodes,
) {
  switch (domainExceptionCode) {
    case DomainExceptionCodes.ALREADY_EXISTS:
    case DomainExceptionCodes.ALREADY_IN_USE:
    case DomainExceptionCodes.INVALID_PARAM:
      return 400;
    case DomainExceptionCodes.NOT_FOUND:
      return 404;
    case DomainExceptionCodes.UNAUTHORIZED:
      return 401;
  }
}

export type HttpResponsePayload = {
  body?: any;
  params?: any;
  [key: string]: any;
};

export function ok({
  body,
  params,
  ...rest
}: HttpResponsePayload): HttpResponse {
  return {
    statusCode: 200,
    body,
    params,
    ...rest,
  };
}

export function created({
  body,
  params,
  ...rest
}: HttpResponsePayload): HttpResponse {
  return {
    statusCode: 201,
    body,
    params,
    ...rest,
  };
}

export function badRequest({
  body,
  params,
  ...rest
}: HttpResponsePayload): HttpResponse {
  return {
    statusCode: 400,
    body,
    params,

    ...rest,
  };
}

export function unauthorized({
  body,
  params,
  ...rest
}: HttpResponsePayload): HttpResponse {
  return {
    statusCode: 401,
    body,
    params,

    ...rest,
  };
}

export function serverError({
  body,
  params,
  ...rest
}: HttpResponsePayload): HttpResponse {
  return {
    statusCode: 500,
    body,
    params,

    ...rest,
  };
}
