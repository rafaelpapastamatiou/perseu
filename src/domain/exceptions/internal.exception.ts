import { DomainExceptionCodes } from '../enums/domain-exception-codes.enum';
import { DomainException } from './domain-exception';

export class InternalException extends DomainException {
  constructor() {
    super(`Internal error`, DomainExceptionCodes.INTERNAL);
  }
}
