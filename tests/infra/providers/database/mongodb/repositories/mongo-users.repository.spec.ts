import { MongoUsersRepository } from '@infra/database/mongodb/repositories/mongo-users.repository';
import { mockedUser } from '@tests/domain/mocks/user.mock';
import {
  clearMongoMemoryServer,
  connectMongoMemoryServer,
  disconnectMongoMemoryServer,
} from '../setupMongo';

const makeSut = (): MongoUsersRepository => {
  return new MongoUsersRepository();
};

describe('MongoDb Users Repository', () => {
  beforeAll(async () => {
    await connectMongoMemoryServer();
  });

  beforeEach(async () => {
    await clearMongoMemoryServer();
  });

  afterAll(async () => {
    await disconnectMongoMemoryServer();
  });

  it('generateId()', async () => {
    const sut = makeSut();

    const id = await sut.generateId();

    expect(id).toHaveLength(24);
  });

  it('add()', async () => {
    const sut = makeSut();

    await sut.add(mockedUser);

    const user = await sut.findById(mockedUser.id);

    expect(user).toEqual(mockedUser);
  });

  it('findById()', async () => {
    const sut = makeSut();

    await sut.add(mockedUser);

    const user = await sut.findById(mockedUser.id);

    expect(user).toEqual(mockedUser);
  });

  it('findByEmail()', async () => {
    const sut = makeSut();

    await sut.add(mockedUser);

    const user = await sut.findByEmail(mockedUser.email);

    expect(user).toEqual(mockedUser);
  });
});
