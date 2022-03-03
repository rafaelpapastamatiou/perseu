import { InvalidCredentialsException } from '@application/exceptions/invalid-credentials.exception';
import { Authenticate } from '@application/useCases/authenticate';
import {
  mockedUser,
  mockedUserWithoutPassword,
} from '@tests/domain/mocks/user.mock';
import { UsersRepositoryStub } from '@tests/infra/mocks/repositories/users.repository.stub';
import { HashComparerStub } from '@tests/infra/mocks/providers/comparer.stub';
import { JwtStub } from '@tests/infra/mocks/providers/jwt.stub';
import { UserSerializerStub } from '@tests/infra/mocks/providers/serializers/user.serializer.stub';

const makeSut = () => {
  const usersRepositoryStub = new UsersRepositoryStub();
  const comparerStub = new HashComparerStub();
  const jwtStub = new JwtStub();
  const userSerializerStub = new UserSerializerStub();

  const sut = new Authenticate(
    usersRepositoryStub,
    comparerStub,
    jwtStub,
    userSerializerStub,
  );

  return {
    sut,
    usersRepositoryStub,
    comparerStub,
    jwtStub,
  };
};

describe('Authenticate', () => {
  it('should authenticate and return an access-token and user', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    jest
      .spyOn(usersRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(mockedUser);

    const result = await sut.execute({
      email: mockedUser.email,
      password: mockedUser.password,
    });

    expect(result.accessToken).toBe('fake-token');
    expect(result.user).toEqual(mockedUserWithoutPassword);
  });

  it('should not be able to authenticate with invalid email', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    jest
      .spyOn(usersRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    expect(
      sut.execute({ email: 'fakeuser@email.com', password: '123456' }),
    ).rejects.toThrow(InvalidCredentialsException);
  });

  it('should not be able to authenticate with invalid password', async () => {
    const { sut, comparerStub } = makeSut();

    jest.spyOn(comparerStub, 'compare').mockResolvedValueOnce(false);

    expect(
      sut.execute({ email: 'fakeuser@email.com', password: '123456' }),
    ).rejects.toThrow(InvalidCredentialsException);
  });
});
