import { MongoAssetTypesRepository } from '@infra/database/mongodb/repositories/mongo-asset-types.repository';

export function makeAssetTypesRepository() {
  return new MongoAssetTypesRepository();
}
