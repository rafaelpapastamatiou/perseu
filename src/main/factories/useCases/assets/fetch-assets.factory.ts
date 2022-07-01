import { FetchAssets } from '@application/useCases/assets/fetch-assets';
import { MongoAssetTypesRepository } from '@infra/database/mongodb/repositories/mongo-asset-types.repository';
import { TwelvedataEtfs } from '@infra/twelvedata/twelvedata-etfs';
import { TwelvedataStocks } from '@infra/twelvedata/twelvedata-stocks';
import { makeAssetsRepository } from '@main/factories/providers/repositories/assets.repository.factory';

export function makeFetchAssets() {
  const stocksProvider = new TwelvedataStocks();
  const etfsProvider = new TwelvedataEtfs();
  const assetsRepository = makeAssetsRepository();
  const assetTypesRepository = new MongoAssetTypesRepository();

  return new FetchAssets(
    assetsRepository,
    assetTypesRepository,
    stocksProvider,
    etfsProvider,
  );
}
