import { ok } from '@presentation/http/helpers/http-helpers';
import { HttpRequest } from '@presentation/http/protocols/http';
import { AuthenticateStub } from '@tests/application/mocks/useCases/authenticate.stub';
import { AuthCredentialsDTO } from '@presentation/http/dtos/auth-credentials.dto';
import { SignInController } from '@presentation/http/controllers/signin.controller';
import { InvalidCredentialsException } from '@application/exceptions/invalid-credentials.exception';

const mockedRequestData = {
  email: 'fakeuser@email.com',
  password: '123456',
};

const mockRequest = (): HttpRequest<AuthCredentialsDTO> => {
  return {
    body: mockedRequestData,
    params: {},
    query: {},
  };
};

const makeSut = () => {
  const authenticateStub = new AuthenticateStub();
  const sut = new SignInController(authenticateStub);

  return {
    sut,
    authenticateStub,
  };
};

describe('SignIn Controller', () => {
  it('should throw if Authenticate throws', async () => {
    const { sut, authenticateStub } = makeSut();

    jest.spyOn(authenticateStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(mockRequest())).rejects.toThrow();
  });

  it('should return 200 if provided credentials are valid', async () => {
    const { sut, authenticateStub } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(ok(authenticateStub.result));
  });

  it('should return 401 if provided credentials are invalid', async () => {
    const { sut, authenticateStub } = makeSut();

    jest.spyOn(authenticateStub, 'execute').mockImplementationOnce(() => {
      throw new InvalidCredentialsException();
    });

    await expect(sut.handle(mockRequest())).rejects.toThrow(
      new InvalidCredentialsException(),
    );
  });

  it('should call Authenticate with correct values', async () => {
    const { sut, authenticateStub } = makeSut();

    const authenticateSpy = jest.spyOn(authenticateStub, 'execute');

    await sut.handle(mockRequest());

    expect(authenticateSpy).toHaveBeenCalledWith(mockedRequestData);
  });
});
