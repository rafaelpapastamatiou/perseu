import { DomainExceptionCodes } from '../enums/domain-exception-codes.enum';
import { DomainException } from './domain-exception';

export class NotFoundException extends DomainException {
  constructor(message: string) {
    super(message, DomainExceptionCodes.NOT_FOUND);
  }
}
