import { GetAssetProfileResult } from '@application/providers/assets';
import { GetAssetProfileInterface } from '@application/useCases/assets/get-asset-profile';
import { GetAssetProfileRequestDTO } from '@presentation/http/dtos/get-asset-profile.dto';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class GetAssetProfileController implements Controller {
  constructor(private getAssetProfile: GetAssetProfileInterface) {}

  async handle({
    query,
  }: HttpRequest<any, any, GetAssetProfileRequestDTO>): Promise<
    HttpResponse<GetAssetProfileResult>
  > {
    const profile = await this.getAssetProfile.execute({
      symbol: query.symbol,
      exchange: query.exchange,
    });

    return ok({ body: profile });
  }
}
