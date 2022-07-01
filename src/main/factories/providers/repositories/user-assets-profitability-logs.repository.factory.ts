import { MongoUserAssetsProfitabilityLogsRepository } from '@infra/database/mongodb/repositories/mongo-user-assets-profitability-logs.repository';

export function makeUserAssetsProfitabilityLogsRepository() {
  return new MongoUserAssetsProfitabilityLogsRepository();
}
