import { HttpBadRequestException } from './http.exception';

export class MissingParamException extends HttpBadRequestException {
  constructor(param: string) {
    super(`${param} is missing.`);
  }
}
