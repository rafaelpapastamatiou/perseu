import { ErrorLogControllerDecorator } from '@presentation/http/decorators/error-log-controller.decorator';
import { Controller } from '@presentation/http/protocols/controller';

export const makeErrorLogControllerDecorator = (
  controller: Controller,
): Controller => {
  // const logMongoRepository = new LogMongoRepository();
  return new ErrorLogControllerDecorator(controller);
};
