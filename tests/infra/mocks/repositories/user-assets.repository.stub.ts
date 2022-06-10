import { PaginationResult } from '@application/protocols/pagination.protocols';
import { UserAssetsRepository } from '@application/providers/repositories/user-assets.repository';
import { UserAsset } from '@domain/entities/user-asset';
import {
  createMockedUserAsset,
  mockedUserAssetId,
} from '@tests/domain/mocks/user-asset.mock';

export class UserAssetsRepositoryStub implements UserAssetsRepository {
  async find(): Promise<PaginationResult<UserAsset>> {
    return {
      data: [createMockedUserAsset()],
      total: 1,
      page: 0,
      limit: 100,
    };
  }

  async findById(): Promise<UserAsset | undefined> {
    const userAsset = createMockedUserAsset();

    return userAsset;
  }

  async findBySymbol(): Promise<UserAsset | undefined> {
    const userAsset = createMockedUserAsset();

    return userAsset;
  }

  async add(): Promise<void> {
    return;
  }

  async update(): Promise<void> {
    return;
  }

  async generateId(): Promise<string> {
    return mockedUserAssetId;
  }
}
