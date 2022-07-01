import { GetUserAssetsLogsDaily } from '@application/useCases/userAssetsLogs/get-user-assets-logs-daily';
import { makeUserAssetsLogsRepository } from '@main/factories/providers/repositories/user-assets-logs.repository.factory';

export function makeGetUserAssetsLogsDaily() {
  const userAssetsLogsRepository = makeUserAssetsLogsRepository();

  return new GetUserAssetsLogsDaily(userAssetsLogsRepository);
}
