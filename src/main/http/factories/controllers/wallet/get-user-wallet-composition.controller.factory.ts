import { makeGetUserWalletComposition } from '@main/factories/useCases/wallet/get-user-wallet-composition.factory';
import { GetUserWalletCompositionController } from '@presentation/http/controllers/wallet/get-user-wallet-composition.controller';

export function makeGetUserWalletCompositionController() {
  const getUserWalletComposition = makeGetUserWalletComposition();

  return new GetUserWalletCompositionController(getUserWalletComposition);
}
