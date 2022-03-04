import { DomainExceptionCodes } from '../enums/domain-exception-codes.enum';
import { DomainException } from './domain-exception';

export class UnauthorizedException extends DomainException {
  constructor(message = 'Unauthorized') {
    super(message, DomainExceptionCodes.UNAUTHORIZED);
  }
}
