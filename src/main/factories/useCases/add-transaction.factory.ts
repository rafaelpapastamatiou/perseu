import { AddTransaction } from '@application/useCases/transactions/add-transaction';
import { AddTransactionSignature } from '@domain/useCases/transactions/add-transaction';
import { MongoAssetsRepository } from '@infra/database/mongodb/repositories/mongo-assets.repository';
import { MongoTransactionsRepository } from '@infra/database/mongodb/repositories/mongo-transactions.repository';
import { makeAddAsset } from './add-asset.factory';

export function makeAddTransaction(): AddTransactionSignature {
  const transactionsRepository = new MongoTransactionsRepository();
  const assetsRepository = new MongoAssetsRepository();
  const addAsset = makeAddAsset();

  return new AddTransaction(transactionsRepository, assetsRepository, addAsset);
}
