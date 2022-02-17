import { DomainExceptionCodes } from '../enums/domain-exception-codes.enum';
import { DomainException } from './domain-exception';

export class AlreadyInUseException extends DomainException {
  constructor(name: string) {
    super(`${name} already in use.`, DomainExceptionCodes.ALREADY_IN_USE);
  }
}
