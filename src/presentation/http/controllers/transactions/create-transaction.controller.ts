import { TransactionDTO } from '@application/dtos/transaction.dto';
import { AddTransaction } from '@application/useCases/transactions/add-transaction';
import { CreateTransactionRequestDTO } from '../../dtos/create-transaction.dto';
import { ok } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class CreateTransactionController implements Controller {
  constructor(private addTransaction: AddTransaction) {}

  async handle(
    request: HttpRequest<CreateTransactionRequestDTO>,
  ): Promise<HttpResponse<TransactionDTO>> {
    const { body, userId } = request;

    const transaction = await this.addTransaction.execute({
      userId,
      ...body,
      date: new Date(body.date),
    });

    return ok<TransactionDTO>({
      body: transaction,
    });
  }
}
