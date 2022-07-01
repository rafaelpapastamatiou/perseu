import { GetAssetInfo } from '@application/useCases/assets/get-asset-info';
import { makeAssetsRepository } from '@main/factories/providers/repositories/assets.repository.factory';

export function makeGetAssetInfo(): GetAssetInfo {
  const assetsRepository = makeAssetsRepository();

  return new GetAssetInfo(assetsRepository);
}
