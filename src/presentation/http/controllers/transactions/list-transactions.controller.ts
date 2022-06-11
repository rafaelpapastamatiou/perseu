import { TransactionDTO } from '@application/dtos/transaction.dto';
import { PaginationResult } from '@application/protocols/pagination.protocols';
import { ListTransactionsInterface } from '@application/useCases/transactions/list-transactions';
import { PaginationRequestParamsDTO } from '@presentation/http/dtos/pagination.dto';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/http/protocols/http';

export class ListTransactionsController implements Controller {
  constructor(private listTransactions: ListTransactionsInterface) {}

  async handle({
    userId,
    query: { limit, page },
  }: HttpRequest<any, any, PaginationRequestParamsDTO>): Promise<
    HttpResponse<PaginationResult<TransactionDTO>>
  > {
    const result = await this.listTransactions.execute(
      {
        userId,
      },
      { limit: Number(limit), page: Number(page) },
    );

    return ok({
      body: result,
    });
  }
}
