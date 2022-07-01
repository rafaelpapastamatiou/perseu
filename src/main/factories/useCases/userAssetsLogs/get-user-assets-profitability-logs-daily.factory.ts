import { GetUserAssetsProfitabilityLogsDaily } from '@application/useCases/userAssetsLogs/get-user-assets-profitability-logs-daily';
import { makeUserAssetsProfitabilityLogsRepository } from '@main/factories/providers/repositories/user-assets-profitability-logs.repository.factory';

export function makeGetUserAssetsProfitabilityLogsDaily() {
  const userAssetsProfitabilityLogsRepository =
    makeUserAssetsProfitabilityLogsRepository();

  return new GetUserAssetsProfitabilityLogsDaily(
    userAssetsProfitabilityLogsRepository,
  );
}
