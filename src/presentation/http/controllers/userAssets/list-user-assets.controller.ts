import { UserAssetDTO } from '@application/dtos/user-asset.dto';
import { PaginationResult } from '@application/protocols/pagination.protocols';
import { ListUserAssetsInterface } from '@application/useCases/usersAssets/list-user-assets';
import { PaginationRequestParamsDTO } from '@presentation/http/dtos/pagination.dto';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class ListUserAssetsController implements Controller {
  constructor(private listUserAssets: ListUserAssetsInterface) {}

  async handle({
    userId,
    query: { limit, page },
  }: HttpRequest<any, any, PaginationRequestParamsDTO>): Promise<
    HttpResponse<PaginationResult<UserAssetDTO>>
  > {
    const result = await this.listUserAssets.execute(
      { userId },
      { limit: Number(limit), page: Number(page) },
    );

    return ok({
      body: result,
    });
  }
}
