import { DomainExceptionCodes } from '@domain/enums/domain-exception-codes.enum';
import { HttpResponse } from '@presentation/http/protocols/http';

export function getHttpExceptionCodeFromDomainException(
  domainExceptionCode: DomainExceptionCodes,
) {
  switch (domainExceptionCode) {
    case DomainExceptionCodes.ALREADY_EXISTS:
    case DomainExceptionCodes.ALREADY_IN_USE:
    case DomainExceptionCodes.NOT_FOUND:
      return 400;
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
