import { FetchStocks } from '@application/useCases/assets/fetch-stocks';
import { MongoStocksRepository } from '@infra/database/mongodb/repositories/mongo-stocks.repository';
import { Redis } from '@infra/redis';
import { TwelvedataStocks } from '@infra/twelvedata/twelvedata-stocks';

export function makeFetchStocks() {
  const cache = new Redis();
  const stocksProvider = new TwelvedataStocks(cache);
  const stocksRepository = new MongoStocksRepository(cache);

  return new FetchStocks(stocksProvider, stocksRepository);
}
