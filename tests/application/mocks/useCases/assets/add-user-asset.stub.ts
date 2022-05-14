import { AddUserAssetInterface } from '@application/useCases/usersAssets/add-user-asset';
import { UserAsset } from '@domain/entities/user-asset';
import { createMockedUserAsset } from '@tests/domain/mocks/user-asset.mock';

export class AddUserAssetStub implements AddUserAssetInterface {
  async execute(): Promise<UserAsset> {
    const userAsset = createMockedUserAsset();

    return userAsset;
  }
}
