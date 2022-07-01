import { MongoAssetsRepository } from '@infra/database/mongodb/repositories/mongo-assets.repository';
import { makeRedisCache } from '../redis-cache.factory';

export function makeAssetsRepository() {
  const cache = makeRedisCache();

  return new MongoAssetsRepository(cache);
}
