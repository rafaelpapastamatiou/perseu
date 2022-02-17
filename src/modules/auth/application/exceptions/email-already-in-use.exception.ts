import { AlreadyInUseException } from '@core/domain/exceptions/already-in-use.exception';

export class EmailAlreadyInUseException extends AlreadyInUseException {
  constructor() {
    super('E-mail');
  }
}
