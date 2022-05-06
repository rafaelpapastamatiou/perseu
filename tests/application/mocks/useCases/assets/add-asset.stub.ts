import { AddAssetInterface } from '@application/useCases/assets/add-asset';
import { Asset } from '@domain/entities/asset';
import { createMockedAsset } from '@tests/domain/mocks/asset.mock';

export class AddAssetStub implements AddAssetInterface {
  async execute(): Promise<Asset> {
    const asset = createMockedAsset();

    return asset;
  }
}
