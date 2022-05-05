import { ListTransactions } from '@application/useCases/transactions/list-transactions';
import { MongoTransactionsRepository } from '@infra/database/mongodb/repositories/mongo-transactions.repository';

export function makeListTransactions(): ListTransactions {
  const transactionsRepository = new MongoTransactionsRepository();

  return new ListTransactions(transactionsRepository);
}
