import { CreateUserDTO } from '@presentation/dtos/create-user.dto';
import { SignUpController } from '@presentation/http/controllers/signup.controller';
import { ok } from '@presentation/http/helpers/http-helpers';
import { HttpRequest } from '@presentation/http/protocols/http';
import { AddUserStub } from '@tests/application/useCases/mocks/add-user.stub';
import { AuthenticateStub } from '@tests/application/useCases/mocks/authenticate.stub';

const mockedRequestData = {
  firstName: 'fake',
  lastName: 'user',
  username: 'fakeuser',
  email: 'fake-email',
  password: '123456',
};

const mockRequest = (): HttpRequest<CreateUserDTO> => {
  return {
    body: mockedRequestData,
    params: {},
  };
};

const makeSut = () => {
  const addUserStub = new AddUserStub();
  const authenticateStub = new AuthenticateStub();
  const sut = new SignUpController(addUserStub, authenticateStub);

  return {
    sut,
    addUserStub,
    authenticateStub,
  };
};

describe('SignUp Controller', () => {
  it('should throw if AddUser throws', async () => {
    const { sut, addUserStub } = makeSut();

    jest.spyOn(addUserStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.handle(mockRequest())).rejects.toThrow();
  });

  it('should throw if Authenticate throws', async () => {
    const { sut, authenticateStub } = makeSut();

    jest.spyOn(authenticateStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.handle(mockRequest())).rejects.toThrow();
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut, authenticateStub } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(ok(authenticateStub.result));
  });

  it('should call AddUser with correct values', async () => {
    const { sut, addUserStub } = makeSut();

    const addUserSpy = jest.spyOn(addUserStub, 'execute');

    await sut.handle(mockRequest());

    expect(addUserSpy).toHaveBeenCalledWith(mockedRequestData);
  });

  it('should call Authenticate with correct values', async () => {
    const { sut, authenticateStub } = makeSut();

    const authenticateSpy = jest.spyOn(authenticateStub, 'execute');

    await sut.handle(mockRequest());

    expect(authenticateSpy).toHaveBeenCalledWith({
      usernameOrEmail: mockedRequestData.username,
      password: mockedRequestData.password,
    });
  });
});
