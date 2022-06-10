import { ListUserAssets } from '@application/useCases/usersAssets/list-user-assets';
import { makeListUserAssetsRepository } from '@main/factories/providers/repositories/user-assets.repository.factory';

export function makeListUserAssets() {
  const userAssetsRepository = makeListUserAssetsRepository();

  return new ListUserAssets(userAssetsRepository);
}
