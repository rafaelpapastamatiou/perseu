import { makeGetUserAssetsProfitabilityLogsDaily } from '@main/factories/useCases/userAssetsLogs/get-user-assets-profitability-logs-daily.factory';
import { GetUserAssetsProfitabilityLogsDailyController } from '@presentation/http/controllers/userAssetsLogs/get-user-assets-profitability-logs-daily.controller';

export function makeGetUserAssetsProfitabilityLogsDailyController() {
  const getUserAssetsProfitabilityLogsDaily =
    makeGetUserAssetsProfitabilityLogsDaily();

  return new GetUserAssetsProfitabilityLogsDailyController(
    getUserAssetsProfitabilityLogsDaily,
  );
}
