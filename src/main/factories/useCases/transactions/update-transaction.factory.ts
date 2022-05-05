import { UpdateTransaction } from '@application/useCases/transactions/update-transaction';
import { MongoAssetsRepository } from '@infra/database/mongodb/repositories/mongo-assets.repository';
import { MongoTransactionsRepository } from '@infra/database/mongodb/repositories/mongo-transactions.repository';

export function makeUpdateTransaction(): UpdateTransaction {
  const transactionsRepository = new MongoTransactionsRepository();
  const assetsRepository = new MongoAssetsRepository();

  return new UpdateTransaction(transactionsRepository, assetsRepository);
}
