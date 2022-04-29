import { AddTransactionSignature } from '@domain/useCases/transactions/add-transaction';
import { TransactionDTO } from '@presentation/http/dtos/transaction.dto';
import { CreateTransactionRequestDTO } from '../../dtos/create-transaction.dto';
import { ok } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class CreateTransactionController implements Controller {
  constructor(private addTransaction: AddTransactionSignature) {}

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
      body: TransactionDTO.fromDomain(transaction),
    });
  }
}
