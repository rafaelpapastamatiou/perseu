import { DomainExceptionCodes } from '../enums/domain-exception-codes.enum';
import { DomainException } from './domain-exception';

export class NotFoundException extends DomainException {
  constructor(name: string) {
    super(`${name} was not found.`, DomainExceptionCodes.NOT_FOUND);
  }
}
