import { AddUserAsset } from '@application/useCases/usersAssets/add-user-asset';
import { MongoUsersAssetsRepository } from '@infra/database/mongodb/repositories/mongo-users-assets.repository';

export function makeAddUserAsset(): AddUserAsset {
  const usersAssetsRepository = new MongoUsersAssetsRepository();

  return new AddUserAsset(usersAssetsRepository);
}
