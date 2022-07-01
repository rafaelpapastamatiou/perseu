import { SearchAsset } from '@application/useCases/assets/search-asset';
import { makeAssetsRepository } from '@main/factories/providers/repositories/assets.repository.factory';

export function makeSearchAsset() {
  const assetsRepository = makeAssetsRepository();

  return new SearchAsset(assetsRepository);
}
