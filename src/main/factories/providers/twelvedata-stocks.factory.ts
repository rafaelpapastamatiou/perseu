import { TwelvedataStocks } from '@infra/twelvedata/twelvedata-stocks';
import { makeRedisCache } from './redis-cache.factory';

export function makeTwelvedataStocks() {
  const cache = makeRedisCache();

  return new TwelvedataStocks(cache);
}
