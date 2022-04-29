import { ListTransactionsSignature } from '@domain/useCases/transactions/list-transactionts';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class ListTransactionsController implements Controller {
  constructor(private listTransactions: ListTransactionsSignature) {}

  async handle({ userId }: HttpRequest): Promise<HttpResponse> {
    const transactions = await this.listTransactions.execute({
      userId,
    });

    return ok({
      body: {
        transactions,
      },
    });
  }
}