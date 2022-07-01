import { UserAssetsProfitabilityLog } from '@domain/entities/user-assets-profitability-log';

export class UserAssetsProfitabilityLogDTO {
  id: string;
  date: Date;
  percentage: number;
  userid: string;

  static fromDomain(
    profitabilityLog: UserAssetsProfitabilityLog,
  ): UserAssetsProfitabilityLogDTO {
    const profitabilityLogDto = new UserAssetsProfitabilityLogDTO();

    profitabilityLogDto.id = profitabilityLog.id;
    profitabilityLogDto.date = profitabilityLog.date;
    profitabilityLogDto.percentage = profitabilityLog.percentage;
    profitabilityLogDto.userid = profitabilityLog.userId;

    return profitabilityLogDto;
  }
}
