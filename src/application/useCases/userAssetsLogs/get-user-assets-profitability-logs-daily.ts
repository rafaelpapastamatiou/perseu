import { UserAssetsProfitabilityLogDTO } from '@application/dtos/user-assets-profitability-log.dto';
import { FindWithAuth } from '@application/protocols/repository.protocols';
import { UserAssetsProfitabilityLogsRepository } from '@application/providers/repositories/user-assets-profitability-logs.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type GetUserAssetsProfitabilityLogsDailyInterface = UseCase<
  [FindWithAuth],
  UserAssetsProfitabilityLogDTO[]
>;

export class GetUserAssetsProfitabilityLogsDaily
  implements GetUserAssetsProfitabilityLogsDailyInterface {
  constructor(
    private userAssetsProfitabilityLogsRepository: UserAssetsProfitabilityLogsRepository,
  ) {}

  async execute({
    userId,
  }: FindWithAuth): Promise<UserAssetsProfitabilityLogDTO[]> {
    const profitabilityLogs =
      await this.userAssetsProfitabilityLogsRepository.find({ userId });

    return profitabilityLogs.map((log) =>
      UserAssetsProfitabilityLogDTO.fromDomain(log),
    );
  }
}
