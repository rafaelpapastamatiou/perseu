import { TwelvedataAssets } from '@infra/twelvedata/twelvedata-assets';
import { makeRedisCache } from './redis-cache.factory';

export function makeTwelvedataAssets() {
  const cache = makeRedisCache();

  return new TwelvedataAssets(cache);
}
