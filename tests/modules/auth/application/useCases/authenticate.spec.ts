import { Comparer } from '@core/application/providers/crypto/comparer';
import {
  JsonWebToken,
  JsonWebTokenPayload,
} from '@core/application/providers/json-web-token';
import { InvalidCredentialsException } from '@modules/auth/application/exceptions/invalid-credentials.exception';
import { UsersRepository } from '@modules/auth/application/repositories/users.repository';
import { Authenticate } from '@modules/auth/application/useCases/authenticate';
import { CreateUserPayload, User } from '@modules/auth/domain/entities/user';

const fakeUserId = 'fake-user-id';
const fakeUserData: CreateUserPayload = {
  email: 'fakeuser@email.com',
  firstName: 'fake',
  lastName: 'user',
  username: 'fakeuser',
  password: '123456',
};

const fakeUser = User.create(fakeUserId, fakeUserData);

const makeUsersRepositoryStub = (): UsersRepository => {
  class UsersRepositoryStub implements UsersRepository {
    async findById(): Promise<User> {
      return undefined;
    }

    async findByEmail(): Promise<User> {
      return undefined;
    }

    async findByUsername(): Promise<User> {
      return undefined;
    }

    async findByUsernameOrEmail(): Promise<User> {
      return fakeUser;
    }

    async add(user: User): Promise<User> {
      return user;
    }

    async generateId(): Promise<string> {
      return fakeUserId;
    }
  }

  return new UsersRepositoryStub();
};

const makeComparerStub = (): Comparer => {
  class HashComparerStub implements Comparer {
    async compare(plaitext: string, digest: string): Promise<boolean> {
      return plaitext === digest;
    }
  }

  return new HashComparerStub();
};

const makeJwtStub = (): JsonWebToken => {
  class JwtStub implements JsonWebToken {
    async sign(): Promise<string> {
      return 'fake-token';
    }

    async verify(): Promise<false | JsonWebTokenPayload> {
      return {
        userId: fakeUserId,
        ...fakeUserData,
      };
    }
  }

  return new JwtStub();
};

const makeSut = () => {
  const usersRepositoryStub = makeUsersRepositoryStub();
  const comparerStub = makeComparerStub();
  const jwtStub = makeJwtStub();

  const sut = new Authenticate(usersRepositoryStub, comparerStub, jwtStub);

  return {
    sut,
    usersRepositoryStub,
    comparerStub,
    jwtStub,
  };
};

describe('Authenticate', () => {
  it('should authenticate and return an access-token and user', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      usernameOrEmail: 'fakeuser',
      password: '123456',
    });

    expect(result.accessToken).toBe('fake-token');
    expect(result.user).toEqual(fakeUser);
  });

  it('should not be able to authenticate with invalid username/email', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    jest
      .spyOn(usersRepositoryStub, 'findByUsernameOrEmail')
      .mockResolvedValueOnce(undefined);

    expect(
      sut.execute({ usernameOrEmail: 'fakeuser', password: '123456' }),
    ).rejects.toThrow(InvalidCredentialsException);
  });

  it('should not be able to authenticate with invalid password', async () => {
    const { sut, comparerStub } = makeSut();

    jest.spyOn(comparerStub, 'compare').mockResolvedValueOnce(false);

    expect(
      sut.execute({ usernameOrEmail: 'fakeuser', password: '123456' }),
    ).rejects.toThrow(InvalidCredentialsException);
  });
});
