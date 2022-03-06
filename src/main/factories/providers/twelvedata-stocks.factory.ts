import { Redis } from '@infra/redis';
import { TwelvedataStocks } from '@infra/twelvedata/twelvedata-stocks';

export function makeTwelvedataStocks() {
  const redis = new Redis();

  return new TwelvedataStocks(redis);
}
