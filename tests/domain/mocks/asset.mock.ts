import { CreateAssetPayload, Asset } from '@domain/entities/asset';

export const mockedAssetData: CreateAssetPayload = {
  country: 'USA',
  currency: 'USD',
  exchange: 'fake-exchange',
  micCode: '001',
  symbol: 'FAKE',
  typeId: 'fake-type-id',
  name: 'fake-name',
};

export const mockedAssetId = '507f191e810c19729de860ea';

export const createMockedAsset = () =>
  Asset.create(mockedAssetId, mockedAssetData);
