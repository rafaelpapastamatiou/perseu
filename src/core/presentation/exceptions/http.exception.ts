export enum HttpExceptionCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export class HttpException extends Error {
  public code: HttpExceptionCodes;

  constructor(message: string, code: HttpExceptionCodes) {
    super(message);

    this.code = code;
  }
}

export class HttpBadRequestException extends HttpException {
  constructor(message: string) {
    super(message, HttpExceptionCodes.BAD_REQUEST);
  }
}

export class HttpNotFoundException extends HttpException {
  constructor(message: string) {
    super(message, HttpExceptionCodes.NOT_FOUND);
  }
}

export class HttpForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, HttpExceptionCodes.FORBIDDEN);
  }
}

export class HttpUnauthorizedException extends HttpException {
  constructor() {
    super('Unauthorized', HttpExceptionCodes.UNAUTHORIZED);
  }
}
