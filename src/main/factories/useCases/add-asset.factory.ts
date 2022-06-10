import { AddUserAsset } from '@application/useCases/usersAssets/add-user-asset';
import { MongoUserAssetsRepository } from '@infra/database/mongodb/repositories/mongo-user-assets.repository';

export function makeAddUserAsset(): AddUserAsset {
  const usersAssetsRepository = new MongoUserAssetsRepository();

  return new AddUserAsset(usersAssetsRepository);
}
