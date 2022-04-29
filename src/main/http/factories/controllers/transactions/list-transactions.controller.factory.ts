import { makeListTransactions } from '@main/factories/useCases/transactions/list-transactions.factory';
import { ListTransactionsController } from '@presentation/http/controllers/transactions/list-transactions.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeListTransactionsController(): Controller {
  const listTransactions = makeListTransactions();

  return new ListTransactionsController(listTransactions);
}
