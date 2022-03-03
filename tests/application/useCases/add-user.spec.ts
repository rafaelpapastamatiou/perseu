import { EmailAlreadyInUseException } from '@application/exceptions/email-already-in-use.exception';
import { AddUser } from '@application/useCases/add-user';
import { mockedUser, mockedUserData } from '@tests/domain/mocks/user.mock';
import { UsersRepositoryStub } from '@tests/infra/mocks/repositories/users.repository.stub';
import { HasherStub } from '@tests/infra/mocks/providers/hasher.stub';

const makeSut = () => {
  const usersRepositoryStub = new UsersRepositoryStub();
  const hasherStub = new HasherStub();

  const createUser = new AddUser(usersRepositoryStub, hasherStub);

  return { sut: createUser, usersRepositoryStub, hasherStub };
};

describe('AddUser', () => {
  it('should create a new User', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    const usersRepositoryAddUserSpy = jest.spyOn(usersRepositoryStub, 'add');

    const user = await sut.execute(mockedUserData);

    expect(usersRepositoryAddUserSpy).toHaveBeenCalledWith(mockedUser);

    expect(user).toEqual(mockedUser);
  });

  it('should not be able to create a new User with an already used e-mail', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    jest
      .spyOn(usersRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(mockedUser);

    expect(sut.execute(mockedUserData)).rejects.toThrow(
      EmailAlreadyInUseException,
    );
  });

  it('should throw if generateId throws', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    jest.spyOn(usersRepositoryStub, 'generateId').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.execute(mockedUserData)).rejects.toThrow();
  });
});
