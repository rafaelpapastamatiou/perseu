import { FetchAssets } from '@application/useCases/assets/fetch-assets';
import { MongoAssetsRepository } from '@infra/database/mongodb/repositories/mongo-assets.repository';
import { Redis } from '@infra/redis';
import { TwelvedataEtfs } from '@infra/twelvedata/twelvedata-etfs';
import { TwelvedataStocks } from '@infra/twelvedata/twelvedata-stocks';

export function makeFetchAssets() {
  const cache = new Redis();
  const stocksProvider = new TwelvedataStocks(cache);
  const etfsProvider = new TwelvedataEtfs();
  const assetsRepository = new MongoAssetsRepository(cache);

  return new FetchAssets(assetsRepository, stocksProvider, etfsProvider);
}
