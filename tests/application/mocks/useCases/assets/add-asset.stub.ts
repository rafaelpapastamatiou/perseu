import { Asset } from '@domain/entities/asset';
import { AddAssetSignature } from '@domain/useCases/assets/add-asset';
import { createMockedAsset } from '@tests/domain/mocks/asset.mock';

export class AddAssetStub implements AddAssetSignature {
  async execute(): Promise<Asset> {
    const asset = createMockedAsset();

    return asset;
  }
}
