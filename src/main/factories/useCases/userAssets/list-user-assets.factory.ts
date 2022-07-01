import { ListUserAssets } from '@application/useCases/usersAssets/list-user-assets';
import { makeUserAssetsRepository } from '@main/factories/providers/repositories/user-assets.repository.factory';

export function makeListUserAssets() {
  const userAssetsRepository = makeUserAssetsRepository();

  return new ListUserAssets(userAssetsRepository);
}
