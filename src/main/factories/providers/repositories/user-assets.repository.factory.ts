import { MongoUserAssetsRepository } from '@infra/database/mongodb/repositories/mongo-user-assets.repository';

export function makeUserAssetsRepository() {
  return new MongoUserAssetsRepository();
}
