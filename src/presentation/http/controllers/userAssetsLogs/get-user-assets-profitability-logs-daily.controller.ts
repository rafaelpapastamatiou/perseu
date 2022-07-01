import { UserAssetsProfitabilityLogDTO } from '@application/dtos/user-assets-profitability-log.dto';
import { GetUserAssetsProfitabilityLogsDailyInterface } from '@application/useCases/userAssetsLogs/get-user-assets-profitability-logs-daily';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class GetUserAssetsProfitabilityLogsDailyController
  implements Controller {
  constructor(
    private getUserAssetsProfitabilityLogsDaily: GetUserAssetsProfitabilityLogsDailyInterface,
  ) {}

  async handle({
    userId,
  }: HttpRequest): Promise<HttpResponse<UserAssetsProfitabilityLogDTO[]>> {
    const profitabilityLogs =
      await this.getUserAssetsProfitabilityLogsDaily.execute({
        userId,
      });

    return ok({
      body: profitabilityLogs,
    });
  }
}
