import { makeAddTransaction } from '@main/factories/useCases/add-transaction.factory';
import { TransactionCreationController } from '@presentation/http/controllers/transaction-creation.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeTransactionCreationController(): Controller {
  const addTransaction = makeAddTransaction();

  return new TransactionCreationController(addTransaction);
}
