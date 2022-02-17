import { AlreadyInUseException } from '@core/domain/exceptions/already-in-use.exception';

export class UsernameAlreadyInUseException extends AlreadyInUseException {
  constructor() {
    super('Username');
  }
}
