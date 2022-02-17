import { ErrorCodes } from '@core/domain/enums/error-codes.enum';
import { HttpResponse } from '@core/presentation/protocols/http';

export function getHttpExceptionCodeFromDomainException(
  domainExceptionCode: ErrorCodes,
) {
  switch (domainExceptionCode) {
    case ErrorCodes.ALREADY_EXISTS:
    case ErrorCodes.ALREADY_IN_USE:
    case ErrorCodes.NOT_FOUND:
      return 400;
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
