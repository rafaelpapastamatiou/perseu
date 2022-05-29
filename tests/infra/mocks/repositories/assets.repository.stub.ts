import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { Asset } from '@domain/entities/asset';
import {
  createMockedAsset,
  mockedAssetId,
} from '@tests/domain/mocks/asset.mock';

export class AssetsRepositoryStub implements AssetsRepository {
  async find(): Promise<Asset[]> {
    return [createMockedAsset()];
  }

  async findBySymbol(): Promise<Asset> {
    return createMockedAsset();
  }

  async import(exchanges: Asset[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async generateId(): Promise<string> {
    return mockedAssetId;
  }
}
