import {
  SearchAssetInterface,
  SearchAssetResult,
} from '@application/useCases/assets/search-asset';
import { SearchAssetDTO } from '@presentation/http/dtos/search-asset.dto';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class SearchAssetController implements Controller {
  constructor(private searchAsset: SearchAssetInterface) {}

  async handle({
    query: { search },
  }: HttpRequest<any, any, SearchAssetDTO>): Promise<
    HttpResponse<SearchAssetResult[]>
  > {
    const searchedAssets = await this.searchAsset.execute({ search });

    return ok({
      body: searchedAssets,
    });
  }
}
