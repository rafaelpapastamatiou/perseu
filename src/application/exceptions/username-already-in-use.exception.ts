import { AlreadyInUseException } from '@domain/exceptions/already-in-use.exception';

export class UsernameAlreadyInUseException extends AlreadyInUseException {
  constructor() {
    super('Username');
  }
}
