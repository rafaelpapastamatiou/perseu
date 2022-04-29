import { UpdateTransaction } from '@application/useCases/transactions/update-transaction';
import { UpdateTransactionDTO } from '../dtos/update-transaction.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

type RequestParams = {
  id: string;
};

export class TransactionUpdateController implements Controller {
  constructor(private updateTransaction: UpdateTransaction) {}

  async handle({
    body,
    userId,
    params,
  }: HttpRequest<UpdateTransactionDTO, RequestParams>): Promise<HttpResponse> {
    const updatedTransaction = await this.updateTransaction.execute(
      {
        id: params.id,
        userId,
      },
      body,
    );

    return ok({
      body: updatedTransaction,
    });
  }
}
