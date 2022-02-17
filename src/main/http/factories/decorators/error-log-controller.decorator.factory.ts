import { ErrorLogControllerDecorator } from '@main/http/decorators/error-log-controller.decorator';
import { Controller } from '@core/presentation/protocols/controller';

export const makeErrorLogControllerDecorator = (
  controller: Controller,
): Controller => {
  // const logMongoRepository = new LogMongoRepository();
  return new ErrorLogControllerDecorator(controller);
};
