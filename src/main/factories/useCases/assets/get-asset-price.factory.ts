import { GetAssetPrice } from '@application/useCases/assets/get-asset-price';
import { makeTwelvedataAssets } from '@main/factories/providers/twelvedata-assets.factory';

export function makeGetAssetPrice(): GetAssetPrice {
  const assetsProvider = makeTwelvedataAssets();

  return new GetAssetPrice(assetsProvider);
}
