import { GetUserWalletComposition } from '@application/useCases/wallet/get-user-wallet-composition';
import { makeUserWalletRepository } from '@main/factories/providers/repositories/user-wallet.repository.factory';

export function makeGetUserWalletComposition() {
  const userWalletRepository = makeUserWalletRepository();

  return new GetUserWalletComposition(userWalletRepository);
}
