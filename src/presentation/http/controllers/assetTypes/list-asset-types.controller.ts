import { ListAssetTypesInterface } from '@application/useCases/assetTypes/list-asset-types';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpResponse } from '@presentation/http/protocols/http';

export class ListAssetTypesController implements Controller {
  constructor(private listAssetTypes: ListAssetTypesInterface) {}

  async handle(): Promise<HttpResponse<any>> {
    const assetTypes = await this.listAssetTypes.execute();

    return ok({
      body: assetTypes,
    });
  }
}
