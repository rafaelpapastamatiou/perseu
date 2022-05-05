import { AddAsset } from '@application/useCases/assets/add-asset';
import { MongoAssetsRepository } from '@infra/database/mongodb/repositories/mongo-assets.repository';

export function makeAddAsset(): AddAsset {
  const assetsRepository = new MongoAssetsRepository();

  return new AddAsset(assetsRepository);
}
