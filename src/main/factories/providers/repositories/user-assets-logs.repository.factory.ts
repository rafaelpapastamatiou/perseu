import { MongoUserAssetsLogsRepository } from '@infra/database/mongodb/repositories/mongo-user-assets-logs-repository';

export function makeUserAssetsLogsRepository() {
  return new MongoUserAssetsLogsRepository();
}
