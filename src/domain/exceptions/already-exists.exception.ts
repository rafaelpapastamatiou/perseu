import { DomainExceptionCodes } from '../enums/domain-exception-codes.enum';
import { DomainException } from './domain-exception';

export class AlreadyExistsException extends DomainException {
  constructor(name: string) {
    super(`${name} already exists.`, DomainExceptionCodes.ALREADY_EXISTS);
  }
}
