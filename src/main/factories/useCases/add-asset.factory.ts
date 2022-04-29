import { AddAsset } from '@application/useCases/assets/add-asset';
import { AddAssetSignature } from '@domain/useCases/assets/add-asset';
import { MongoAssetsRepository } from '@infra/database/mongodb/repositories/mongo-assets.repository';

export function makeAddAsset(): AddAssetSignature {
  const assetsRepository = new MongoAssetsRepository();

  return new AddAsset(assetsRepository);
}
