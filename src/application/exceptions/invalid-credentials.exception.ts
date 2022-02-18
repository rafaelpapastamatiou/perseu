import { DomainExceptionCodes } from '@domain/enums/domain-exception-codes.enum';
import { DomainException } from '@domain/exceptions/domain-exception';

export class InvalidCredentialsException extends DomainException {
  constructor() {
    super('Invalid credentials.', DomainExceptionCodes.UNAUTHORIZED);
  }
}
