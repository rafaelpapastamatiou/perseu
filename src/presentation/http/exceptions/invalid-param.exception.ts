import { HttpBadRequestException } from './http.exception';

export class InvalidParamException extends HttpBadRequestException {
  constructor(param: string, shouldBe: string) {
    super(`${param} should be ${shouldBe}`);
  }
}
