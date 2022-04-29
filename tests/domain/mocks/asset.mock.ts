import { Asset, CreateAssetPayload } from '@domain/entities/asset';
import { UpdateAssetIdentifier } from '@domain/useCases/assets/update-asset';

export const mockedAssetData: CreateAssetPayload = {
  exchange: 'fake-exchange',
  quantity: 10,
  symbol: 'FAKE',
  type: 'stock',
  userId: 'fake-user-id',
};

export const mockedAssetId = '507f191e810c19729de860ea';

export const createMockedAsset = () =>
  Asset.create(mockedAssetId, mockedAssetData);

export const mockedAssetIdentifier: UpdateAssetIdentifier = {
  id: 'fake-id',
  userId: 'fake-user-id',
};
