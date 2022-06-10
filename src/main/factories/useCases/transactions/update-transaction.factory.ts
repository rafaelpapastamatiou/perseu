import { UpdateTransaction } from '@application/useCases/transactions/update-transaction';
import { MongoUserAssetsRepository } from '@infra/database/mongodb/repositories/mongo-user-assets.repository';
import { MongoTransactionsRepository } from '@infra/database/mongodb/repositories/mongo-transactions.repository';

export function makeUpdateTransaction(): UpdateTransaction {
  const transactionsRepository = new MongoTransactionsRepository();
  const usersAssetsRepository = new MongoUserAssetsRepository();

  return new UpdateTransaction(transactionsRepository, usersAssetsRepository);
}
