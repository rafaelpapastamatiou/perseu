import { GetUserWalletCompositionResult } from '@application/providers/repositories/user-wallet.repository';
import { GetUserWalletCompositionInterface } from '@application/useCases/wallet/get-user-wallet-composition';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class GetUserWalletCompositionController implements Controller {
  constructor(
    private getUserWalletComposition: GetUserWalletCompositionInterface,
  ) {}

  async handle({
    userId,
  }: HttpRequest): Promise<HttpResponse<GetUserWalletCompositionResult>> {
    const composition = await this.getUserWalletComposition.execute({ userId });

    return ok({
      body: composition,
    });
  }
}
