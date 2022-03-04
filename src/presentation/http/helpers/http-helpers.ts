import { DomainExceptionCodes } from '@domain/enums/domain-exception-codes.enum';
import { HttpResponse } from '@presentation/http/protocols/http';

export function getHttpExceptionCodeFromDomainException(
  domainExceptionCode: DomainExceptionCodes,
) {
  switch (domainExceptionCode) {
    case DomainExceptionCodes.ALREADY_EXISTS:
    case DomainExceptionCodes.ALREADY_IN_USE:
      return 400;
    case DomainExceptionCodes.NOT_FOUND:
      return 404;
    case DomainExceptionCodes.UNAUTHORIZED:
      return 401;
  }
}

export function ok(body: any): HttpResponse {
  return {
    statusCode: 200,
    body,
  };
}

export function created(body: any): HttpResponse {
  return {
    statusCode: 201,
    body,
  };
}

export function badRequest(body: any): HttpResponse {
  return {
    statusCode: 400,
    body,
  };
}

export function unauthorized(body: any): HttpResponse {
  return {
    statusCode: 401,
    body,
  };
}

export function serverError(body: any): HttpResponse {
  return {
    statusCode: 500,
    body,
  };
}
