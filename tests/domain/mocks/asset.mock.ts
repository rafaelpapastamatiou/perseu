import { CreateAssetPayload, Asset, AssetTypes } from '@domain/entities/asset';

export const mockedAssetData: CreateAssetPayload = {
  country: 'USA',
  currency: 'USD',
  exchange: 'fake-exchange',
  micCode: '001',
  symbol: 'FAKE',
  type: AssetTypes.Stock,
  name: 'fake-name',
};

export const mockedAssetId = '507f191e810c19729de860ea';

export const createMockedAsset = () =>
  Asset.create(mockedAssetId, mockedAssetData);
