import { UnauthorizedException } from '@domain/exceptions/unauthorized.exception';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('Invalid credentials.');
  }
}
