import { TransactionDTO } from '@application/dtos/transaction.dto';
import { ListTransactions } from '@application/useCases/transactions/list-transactions';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class ListTransactionsController implements Controller {
  constructor(private listTransactions: ListTransactions) {}

  async handle({
    userId,
  }: HttpRequest): Promise<HttpResponse<TransactionDTO[]>> {
    const transactions = await this.listTransactions.execute({
      userId,
    });

    return ok<TransactionDTO[]>({
      body: transactions,
    });
  }
}
