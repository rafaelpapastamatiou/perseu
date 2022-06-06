import { GetUserWalletComposition } from '@application/useCases/wallet/get-user-wallet-composition';
import { MongoUserWalletRepository } from '@infra/database/mongodb/repositories/mongo-user-wallet.repository';
import { makeTwelvedataStocks } from '@main/factories/providers/twelvedata-stocks.factory';

export function makeGetUserWalletComposition() {
  const stocksProvider = makeTwelvedataStocks();
  const userWalletRepository = new MongoUserWalletRepository(stocksProvider);

  return new GetUserWalletComposition(userWalletRepository);
}
