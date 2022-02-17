import { HttpBadRequestException } from './http.exception';

export class AlreadyInUseException extends HttpBadRequestException {
  constructor(name: string) {
    super(`${name} already in use.`);
  }
}
