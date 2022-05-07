import { MongoExchangesRepository } from '@infra/database/mongodb/repositories/mongo-exchanges.repository';
import { makeRedisCache } from '../redis-cache.factory';

export function makeExchangesRepository() {
  const cache = makeRedisCache();

  return new MongoExchangesRepository(cache);
}
