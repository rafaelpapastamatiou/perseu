// import { LogErrorRepository } from '@/data/protocols/db';

import { DomainException } from '@core/domain/exceptions/domain-exception';
import { HttpException } from '@core/presentation/exceptions/http.exception';
import { Controller } from '@core/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@core/presentation/protocols/http';

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
