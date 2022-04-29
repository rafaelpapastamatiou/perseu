import { ListTransactions } from '@application/useCases/transactions/list-transactions';
import { ListTransactionsSignature } from '@domain/useCases/transactions/list-transactionts';
import { MongoTransactionsRepository } from '@infra/database/mongodb/repositories/mongo-transactions.repository';

export function makeListTransactions(): ListTransactionsSignature {
  const transactionsRepository = new MongoTransactionsRepository();

  return new ListTransactions(transactionsRepository);
}
