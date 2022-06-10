import { MongoUserWalletRepository } from '@infra/database/mongodb/repositories/mongo-user-wallet.repository';
import { makeTwelvedataAssets } from '../twelvedata-assets.factory';

export function makeUserWalletRepository() {
  const assetsProvider = makeTwelvedataAssets();

  return new MongoUserWalletRepository(assetsProvider);
}
