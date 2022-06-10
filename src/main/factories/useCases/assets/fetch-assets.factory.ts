import { FetchAssets } from '@application/useCases/assets/fetch-assets';
import { MongoAssetTypesRepository } from '@infra/database/mongodb/repositories/mongo-asset-types.repository';
import { MongoAssetsRepository } from '@infra/database/mongodb/repositories/mongo-assets.repository';
import { Redis } from '@infra/redis';
import { TwelvedataEtfs } from '@infra/twelvedata/twelvedata-etfs';
import { TwelvedataStocks } from '@infra/twelvedata/twelvedata-stocks';

export function makeFetchAssets() {
  const cache = new Redis();
  const stocksProvider = new TwelvedataStocks();
  const etfsProvider = new TwelvedataEtfs();
  const assetsRepository = new MongoAssetsRepository(cache);
  const assetTypesRepository = new MongoAssetTypesRepository();

  return new FetchAssets(
    assetsRepository,
    assetTypesRepository,
    stocksProvider,
    etfsProvider,
  );
}
