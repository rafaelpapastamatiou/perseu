import { FetchAssets } from '@application/useCases/assets/fetch-assets';
import { MongoStocksRepository } from '@infra/database/mongodb/repositories/mongo-stocks.repository';
import { Redis } from '@infra/redis';
import { TwelvedataEtfs } from '@infra/twelvedata/twelvedata-etfs';
import { TwelvedataStocks } from '@infra/twelvedata/twelvedata-stocks';

export function makeeFetchAssets() {
  const cache = new Redis();
  const stocksProvider = new TwelvedataStocks(cache);
  const etfsProvider = new TwelvedataEtfs();
  const stocksRepository = new MongoStocksRepository(cache);

  return new FetchAssets(stocksRepository, stocksProvider, etfsProvider);
}
