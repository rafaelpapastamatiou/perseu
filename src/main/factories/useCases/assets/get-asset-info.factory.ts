import { GetAssetInfo } from '@application/useCases/assets/get-asset-info';
import { MongoAssetsRepository } from '@infra/database/mongodb/repositories/mongo-assets.repository';
import { Redis } from '@infra/redis';

export function makeGetAssetInfo(): GetAssetInfo {
  const cache = new Redis();
  const assetsRepository = new MongoAssetsRepository(cache);

  return new GetAssetInfo(assetsRepository);
}
