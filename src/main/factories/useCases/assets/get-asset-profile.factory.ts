import { GetAssetProfile } from '@application/useCases/assets/get-asset-profile';
import { makeTwelvedataAssets } from '@main/factories/providers/twelvedata-assets.factory';

export function makeGetAssetProfile() {
  const assetsProvider = makeTwelvedataAssets();

  return new GetAssetProfile(assetsProvider);
}
