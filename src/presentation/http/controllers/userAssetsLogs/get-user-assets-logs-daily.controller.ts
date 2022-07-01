import { UserAssetsLogDTO } from '@application/dtos/user-assets-log.dto';
import { GetUserAssetsLogsDailyInterface } from '@application/useCases/userAssetsLogs/get-user-assets-logs-daily';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class GetUserAssetsLogsDailyController implements Controller {
  constructor(
    private getUserAssetsLogsDaily: GetUserAssetsLogsDailyInterface,
  ) {}

  async handle({
    userId,
  }: HttpRequest): Promise<HttpResponse<UserAssetsLogDTO[]>> {
    const userAssetsLogs = await this.getUserAssetsLogsDaily.execute({
      userId,
    });

    return ok({
      body: userAssetsLogs,
    });
  }
}
