import { EmailAlreadyInUseException } from '@application/exceptions/email-already-in-use.exception';
import { AddUser } from '@application/useCases/add-user';
import {
  mockedUser,
  mockedUserData,
  mockedUserWithoutPassword,
} from '@tests/domain/mocks/user.mock';
import { UsersRepositoryStub } from '@tests/infra/mocks/repositories/users.repository.stub';
import { HasherStub } from '@tests/infra/mocks/providers/hasher.stub';
import { UserSerializerStub } from '@tests/infra/mocks/providers/serializers/user.serializer.stub';
import { User } from '@domain/entities/user';

const makeSut = () => {
  const usersRepositoryStub = new UsersRepositoryStub();
  const hasherStub = new HasherStub();
  const userSerializerStub = new UserSerializerStub();

  const createUser = new AddUser(
    usersRepositoryStub,
    hasherStub,
    userSerializerStub,
  );

  return { sut: createUser, usersRepositoryStub, hasherStub };
};

describe('AddUser', () => {
  it('should create a new User', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    const usersRepositoryAddUserSpy = jest.spyOn(usersRepositoryStub, 'add');

    const user = await sut.execute(mockedUserData);

    expect(usersRepositoryAddUserSpy).toHaveBeenCalledWith(mockedUser);

    expect(user).toEqual(mockedUserWithoutPassword);
  });

  it('should not be able to create a new User with an already used e-mail', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    jest
      .spyOn(usersRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(mockedUser);

    await expect(sut.execute(mockedUserData)).rejects.toThrow(
      EmailAlreadyInUseException,
    );
  });

  it('should throw if generateId throws', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    jest.spyOn(usersRepositoryStub, 'generateId').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.execute(mockedUserData)).rejects.toThrow();
  });

  it('should throw if generateId fails', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    jest
      .spyOn(usersRepositoryStub, 'generateId')
      .mockResolvedValueOnce(undefined);

    await expect(sut.execute(mockedUserData)).rejects.toThrow();
  });

  it('should throw if user creation fails', async () => {
    const { sut } = makeSut();

    jest.spyOn(User, 'create').mockReturnValueOnce(undefined);

    const promise = sut.execute(mockedUserData);

    await expect(promise).rejects.toThrow();
  });
});
