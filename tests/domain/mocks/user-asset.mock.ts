import { UserAsset, CreateUserAssetPayload } from '@domain/entities/user-asset';

export const mockedUserAssetData: CreateUserAssetPayload = {
  exchange: 'fake-exchange',
  quantity: 10,
  symbol: 'FAKE',
  type: 'stock',
  userId: 'fake-user-id',
};

export const mockedUserAssetId = '507f191e810c19729de860ea';

export const createMockedUserAsset = () =>
  UserAsset.create(mockedUserAssetId, mockedUserAssetData);

export const mockedUserAssetIdentifier = {
  id: 'fake-id',
  userId: 'fake-user-id',
};
