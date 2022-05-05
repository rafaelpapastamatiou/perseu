import { AddAsset } from '@application/useCases/assets/add-asset';
import { Asset } from '@domain/entities/asset';
import { createMockedAsset } from '@tests/domain/mocks/asset.mock';

export class AddAssetStub extends AddAsset {
  constructor() {
    super(null);
  }

  async execute(): Promise<Asset> {
    const asset = createMockedAsset();

    return asset;
  }
}
