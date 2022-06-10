import { MongoUserAssetsRepository } from '@infra/database/mongodb/repositories/mongo-user-assets.repository';

export function makeListUserAssetsRepository() {
  return new MongoUserAssetsRepository();
}
