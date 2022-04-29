import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { Asset } from '@domain/entities/asset';
import {
  createMockedAsset,
  mockedAssetId,
} from '@tests/domain/mocks/asset.mock';

export class AssetsRepositoryStub implements AssetsRepository {
  async findById(): Promise<Asset | undefined> {
    const asset = createMockedAsset();

    return asset;
  }

  async findBySymbol(): Promise<Asset | undefined> {
    const asset = createMockedAsset();

    return asset;
  }

  async add(): Promise<void> {
    return;
  }

  async update(): Promise<void> {
    return;
  }

  async generateId(): Promise<string> {
    return mockedAssetId;
  }
}
