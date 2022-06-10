import { GetUserWalletCompositionByAssetType } from '@application/useCases/wallet/get-user-wallet-composition-by-asset-type';
import { makeUserWalletRepository } from '@main/factories/providers/repositories/user-wallet.repository.factory';

export function makeGetUserWalletCompositionByAssetType() {
  const userWalletRepository = makeUserWalletRepository();

  return new GetUserWalletCompositionByAssetType(userWalletRepository);
}
