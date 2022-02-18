// import { LogErrorRepository } from '@/data/protocols/db';

import { DomainException } from '@domain/exceptions/domain-exception';
import { HttpException } from '@presentation/http/exceptions/http.exception';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class ErrorLogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller, // private readonly logErrorRepository: LogErrorRepository,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const httpResponse = await this.controller.handle(request);

      return httpResponse;
    } catch (err) {
      if (err instanceof DomainException || err instanceof HttpException) {
        throw err;
      }

      // await this.logErrorRepository.logError(err.stack);

      throw err;
    }
  }
}
