import { GetUserWalletComposition } from '@application/useCases/wallet/get-user-wallet-composition';
import { MongoUserWalletRepository } from '@infra/database/mongodb/repositories/mongo-user-wallet.repository';
import { makeTwelvedataAssets } from '@main/factories/providers/twelvedata-assets.factory';

export function makeGetUserWalletComposition() {
  const assetsProvider = makeTwelvedataAssets();
  const userWalletRepository = new MongoUserWalletRepository(assetsProvider);

  return new GetUserWalletComposition(userWalletRepository);
}
