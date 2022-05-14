import { UpdateTransaction } from '@application/useCases/transactions/update-transaction';
import { MongoUsersAssetsRepository } from '@infra/database/mongodb/repositories/mongo-users-assets.repository';
import { MongoTransactionsRepository } from '@infra/database/mongodb/repositories/mongo-transactions.repository';

export function makeUpdateTransaction(): UpdateTransaction {
  const transactionsRepository = new MongoTransactionsRepository();
  const usersAssetsRepository = new MongoUsersAssetsRepository();

  return new UpdateTransaction(transactionsRepository, usersAssetsRepository);
}
