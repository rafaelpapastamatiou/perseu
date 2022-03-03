import { User } from '@domain/entities/user';

export const mockedUserData = {
  email: 'fakeuser@email.com',
  firstName: 'fake',
  lastName: 'user',
  password: '1234',
};

export const mockedUserId = '507f191e810c19729de860ea';

export const mockedUser = User.create(mockedUserId, mockedUserData);
