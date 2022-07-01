import { makeSearchAsset } from '@main/factories/useCases/assets/search-asset.factory';
import { SearchAssetController } from '@presentation/http/controllers/assets/search-asset.controller';

export function makeSearchAssetController() {
  const searchAsset = makeSearchAsset();

  return new SearchAssetController(searchAsset);
}
