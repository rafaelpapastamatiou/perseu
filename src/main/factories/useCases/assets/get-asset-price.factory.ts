import { GetAssetPrice } from '@application/useCases/assets/get-asset-price';
import { makeTwelvedataStocks } from '@main/factories/providers/twelvedata-stocks.factory';

export function makeGetAssetPrice(): GetAssetPrice {
  const twelvedataStocks = makeTwelvedataStocks();

  return new GetAssetPrice(twelvedataStocks);
}
