import { DomainExceptionCodes } from '@core/domain/enums/domain-exception-codes.enum';
import { DomainException } from '@core/domain/exceptions/domain-exception';

export class InvalidCredentialsException extends DomainException {
  constructor() {
    super('Invalid credentials.', DomainExceptionCodes.UNAUTHORIZED);
  }
}
