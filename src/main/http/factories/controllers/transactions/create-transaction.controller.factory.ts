import { makeAddTransaction } from '@main/factories/useCases/add-transaction.factory';
import { CreateTransactionController } from '@presentation/http/controllers/transactions/create-transaction.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeCreateTransactionController(): Controller {
  const addTransaction = makeAddTransaction();

  return new CreateTransactionController(addTransaction);
}
