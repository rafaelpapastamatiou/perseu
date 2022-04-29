import { makeUpdateTransaction } from '@main/factories/useCases/transactions/update-transaction.factory';
import { UpdateTransactionController } from '@presentation/http/controllers/transactions/update-transaction.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeUpdateTransactionController(): Controller {
  const updateTransaction = makeUpdateTransaction();

  return new UpdateTransactionController(updateTransaction);
}
