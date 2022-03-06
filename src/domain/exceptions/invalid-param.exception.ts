import { DomainExceptionCodes } from '../enums/domain-exception-codes.enum';
import { DomainException } from './domain-exception';

export class InvalidParamException extends DomainException {
  constructor(message: string) {
    super(message, DomainExceptionCodes.INVALID_PARAM);
  }
}
