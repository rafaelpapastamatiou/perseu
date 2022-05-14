import { AddTransaction } from '@application/useCases/transactions/add-transaction';
import { MongoUsersAssetsRepository } from '@infra/database/mongodb/repositories/mongo-users-assets.repository';
import { MongoTransactionsRepository } from '@infra/database/mongodb/repositories/mongo-transactions.repository';
import { makeAddUserAsset } from './add-asset.factory';

export function makeAddTransaction(): AddTransaction {
  const transactionsRepository = new MongoTransactionsRepository();
  const usersAssetsRepository = new MongoUsersAssetsRepository();
  const addUserAsset = makeAddUserAsset();

  return new AddTransaction(
    transactionsRepository,
    usersAssetsRepository,
    addUserAsset,
  );
}
