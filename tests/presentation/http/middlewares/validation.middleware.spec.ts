import * as classValidator from 'class-validator';

import { ok, serverError } from '@presentation/http/helpers/http-helpers';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';
import { HttpRequest } from '@presentation/http/protocols/http';

const { IsString } = classValidator;

class TestDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;
}

const makeSut = () => {
  const sut = new ValidationMiddleware(TestDTO);

  return { sut };
};

describe('Validation Middleware', () => {
  it('should return ok() if validation pass', async () => {
    const { sut } = makeSut();

    const request: HttpRequest<TestDTO> = {
      body: {
        email: 'fake@email.com',
        name: 'fakename',
      },
      params: {},
    };

    const response = await sut.handle(request);

    expect(response).toEqual(ok({}));
  });

  it('should return badRequest() if validation fails', async () => {
    const { sut } = makeSut();

    const request: HttpRequest<Omit<TestDTO, 'name'>> = {
      body: {
        email: 'fake@email.com',
      },
      params: {},
    };

    const response = await sut.handle(request);

    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
  });

  it('should return serverError() if something throws', async () => {
    const { sut } = makeSut();

    const err = new Error('Test error');

    jest.spyOn(classValidator, 'validate').mockImplementation(() => {
      throw err;
    });

    const request: HttpRequest<TestDTO> = {
      body: {
        email: 'fake@email.com',
        name: 'fakename',
      },
      params: {},
    };

    const response = await sut.handle(request);

    expect(response).toEqual(serverError(err));
  });
});
