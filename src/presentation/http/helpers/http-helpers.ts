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

export type HttpResponsePayload<B> = {
  body?: B;
  [key: string]: any;
};

export type HttpExceptionResponseBody = {
  error?: string;
  errors?: string[];
};

export function ok<B>({
  body,
  ...rest
}: HttpResponsePayload<B>): HttpResponse<B> {
  return {
    statusCode: 200,
    body,
    ...rest,
  };
}

export function created<B>({
  body,
  ...rest
}: HttpResponsePayload<B>): HttpResponse<B> {
  return {
    statusCode: 201,
    body,
    ...rest,
  };
}

export function badRequest({
  body,
  ...rest
}: HttpResponsePayload<HttpExceptionResponseBody>): HttpResponse<HttpExceptionResponseBody> {
  return {
    statusCode: 400,
    body,
    ...rest,
  };
}

export function unauthorized({
  body,
  ...rest
}: HttpResponsePayload<HttpExceptionResponseBody>): HttpResponse<HttpExceptionResponseBody> {
  return {
    statusCode: 401,
    body,
    ...rest,
  };
}

export function serverError({
  body,
  ...rest
}: HttpResponsePayload<HttpExceptionResponseBody>): HttpResponse<HttpExceptionResponseBody> {
  return {
    statusCode: 500,
    body,
    ...rest,
  };
}
