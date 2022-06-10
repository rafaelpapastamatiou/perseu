import { GetUserWalletCompositionByAssetTypeItem } from '@application/providers/repositories/user-wallet.repository';
import { GetUserWalletCompositionByAssetTypeInterface } from '@application/useCases/wallet/get-user-wallet-composition-by-asset-type';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class GetUserWalletCompositionByAssetTypeController
  implements Controller {
  constructor(
    private getUserWalletCompositionByAssetType: GetUserWalletCompositionByAssetTypeInterface,
  ) {}

  async handle({
    userId,
  }: HttpRequest): Promise<
    HttpResponse<GetUserWalletCompositionByAssetTypeItem[]>
  > {
    const composition = await this.getUserWalletCompositionByAssetType.execute({
      userId,
    });

    return ok({
      body: composition,
    });
  }
}
