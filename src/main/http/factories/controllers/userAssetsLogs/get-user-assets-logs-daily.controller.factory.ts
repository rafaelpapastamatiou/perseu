import { makeGetUserAssetsLogsDaily } from '@main/factories/useCases/userAssetsLogs/get-user-assets-logs-daily.factory';
import { GetUserAssetsLogsDailyController } from '@presentation/http/controllers/userAssetsLogs/get-user-assets-logs-daily.controller';

export function makeGetUserAssetsLogsDailyController() {
  const getUserAssetsLogsDaily = makeGetUserAssetsLogsDaily();

  return new GetUserAssetsLogsDailyController(getUserAssetsLogsDaily);
}
