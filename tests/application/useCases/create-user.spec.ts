import { Hasher } from '@application/providers/crypto/hasher';
import { EmailAlreadyInUseException } from '@application/exceptions/email-already-in-use.exception';
import { UsernameAlreadyInUseException } from '@application/exceptions/username-already-in-use.exception';
import { UsersRepository } from '@application/providers/repositories/users.repository';
import { AddUser } from '@application/useCases/add-user';
import { User } from '@domain/entities/user';
import {
  mockedUser,
  mockedUserData,
  mockedUserId,
} from '@tests/domain/mocks/user.mock';

const makeUsersRepositoryStub = (): UsersRepository => {
  class UsersRepositoryStub implements UsersRepository {
    async findByUsernameOrEmail(): Promise<User> {
      return undefined;
    }
    async findById(): Promise<User> {
      return undefined;
    }

    async findByEmail(): Promise<User> {
      return undefined;
    }

    async findByUsername(): Promise<User> {
      return undefined;
    }

    async add(user: User): Promise<User> {
      return user;
    }

    async generateId(): Promise<string> {
      return mockedUserId;
    }
  }

  return new UsersRepositoryStub();
};

const makeHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(text: string): Promise<string> {
      return text;
    }
  }

  return new HasherStub();
};

const makeSut = () => {
  const usersRepositoryStub = makeUsersRepositoryStub();
  const hasherStub = makeHasherStub();

  const createUser = new AddUser(usersRepositoryStub, hasherStub);

  return { sut: createUser, usersRepositoryStub, hasherStub };
};

describe('CreateUser', () => {
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

  it('should not be able to create a new User with an already used username', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    jest
      .spyOn(usersRepositoryStub, 'findByUsername')
      .mockResolvedValueOnce(mockedUser);

    expect(sut.execute(mockedUserData)).rejects.toThrow(
      UsernameAlreadyInUseException,
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
