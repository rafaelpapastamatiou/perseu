import { AddTransactionSignature } from '@domain/useCases/transactions/add-transaction';
import { CreateTransactionDTO } from '../dtos/create-transaction.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class TransactionCreationController implements Controller {
  constructor(private addTransaction: AddTransactionSignature) {}

  async handle(
    request: HttpRequest<CreateTransactionDTO>,
  ): Promise<HttpResponse> {
    console.log(request);

    const { body, userId } = request;

    const transaction = await this.addTransaction.execute({
      userId,
      ...body,
      date: new Date(body.date),
    });

    return ok({
      body: transaction,
    });
  }
}
