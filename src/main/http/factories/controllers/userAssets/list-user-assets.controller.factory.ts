import { makeListUserAssets } from '@main/factories/useCases/userAssets/list-user-assets.factory';
import { ListUserAssetsController } from '@presentation/http/controllers/userAssets/list-user-assets.controller';

export function makeListUserAssetsController() {
  const listUserAssets = makeListUserAssets();

  return new ListUserAssetsController(listUserAssets);
}
