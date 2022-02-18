import { DomainExceptionCodes } from '../enums/domain-exception-codes.enum';

export class DomainException extends Error {
  public code: DomainExceptionCodes;

  constructor(message: string, code: DomainExceptionCodes) {
    super(message);

    this.code = code;
  }
}
