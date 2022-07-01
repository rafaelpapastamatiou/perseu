import { FindWithAuth } from '@application/protocols/repository.protocols';
import { AssetsProvider } from '@application/providers/assets';
import { UserAssetsLogsRepository } from '@application/providers/repositories/user-assets-logs.repository';
import { UserAssetsProfitabilityLogsRepository } from '@application/providers/repositories/user-assets-profitability-logs.repository';
import { UserAssetsRepository } from '@application/providers/repositories/user-assets.repository';
import {
  CreateUserAssetsLogPayload,
  UserAssetsLog,
} from '@domain/entities/user-assets-log';
import {
  CreateUserAssetsProfitabilityLogPayload,
  UserAssetsProfitabilityLog,
} from '@domain/entities/user-assets-profitability-log';
import { UseCase } from '@domain/interfaces/use-case';

export type GenerateUserAssetsLogInterface = UseCase<[FindWithAuth], void>;

export class GenerateUserAssetsLog implements GenerateUserAssetsLogInterface {
  constructor(
    private userAssetsLogsRepository: UserAssetsLogsRepository,
    private userAssetsProfitabilityLogsRepository: UserAssetsProfitabilityLogsRepository,
    private userAssetsRepository: UserAssetsRepository,
    private assetsProvider: AssetsProvider,
  ) {}

  async execute({ userId }: FindWithAuth): Promise<void> {
    const userAssets = await this.userAssetsRepository.find({ userId });

    const userAssetPricePromises: Promise<number>[] = [];

    for (const asset of userAssets) {
      userAssetPricePromises.push(
        this.assetsProvider.getPriceBySymbol({
          symbol: asset.symbol,
          exchange: asset.exchange,
        }),
      );
    }

    const userAssetsPrices = await Promise.all(userAssetPricePromises);

    const userAssetsLogPayload: CreateUserAssetsLogPayload =
      userAssetsPrices.reduce(
        (acc, _, index) => ({
          ...acc,
          total: acc.total + userAssetsPrices[index],
        }),
        {
          total: 0,
          date: new Date(),
          userId,
        },
      );

    const id = await this.userAssetsLogsRepository.generateId();

    const assetsLog = UserAssetsLog.create(id, userAssetsLogPayload);

    const lastLog = await this.userAssetsLogsRepository.findLastLog({ userId });

    if (lastLog) {
      const percentage = (assetsLog.total / lastLog.total) * 100 - 100;
      const formattedPercentage = Number(percentage.toFixed(2));

      const profitabilityLogPayload: CreateUserAssetsProfitabilityLogPayload = {
        userId,
        date: new Date(),
        percentage: formattedPercentage,
      };

      const profitabilityLogId =
        await this.userAssetsProfitabilityLogsRepository.generateId();

      const profitabilitylog = UserAssetsProfitabilityLog.create(
        profitabilityLogId,
        profitabilityLogPayload,
      );

      await this.userAssetsProfitabilityLogsRepository.add(profitabilitylog);
    }

    await this.userAssetsLogsRepository.add(assetsLog);
  }
}
