import { GenerateUserAssetsLog } from '@application/useCases/userAssetsLogs/generate-user-assets-log';
import { makeUserAssetsLogsRepository } from '@main/factories/providers/repositories/user-assets-logs.repository.factory';
import { makeUserAssetsProfitabilityLogsRepository } from '@main/factories/providers/repositories/user-assets-profitability-logs.repository.factory';
import { makeUserAssetsRepository } from '@main/factories/providers/repositories/user-assets.repository.factory';
import { makeTwelvedataAssets } from '@main/factories/providers/twelvedata-assets.factory';

export function makeGenerateUserAssetsLog() {
  const userAssetsLogsRepository = makeUserAssetsLogsRepository();
  const userAssetsProfitabilityLogsRepository =
    makeUserAssetsProfitabilityLogsRepository();
  const userAssetsRepository = makeUserAssetsRepository();
  const assetsProvider = makeTwelvedataAssets();

  return new GenerateUserAssetsLog(
    userAssetsLogsRepository,
    userAssetsProfitabilityLogsRepository,
    userAssetsRepository,
    assetsProvider,
  );
}
