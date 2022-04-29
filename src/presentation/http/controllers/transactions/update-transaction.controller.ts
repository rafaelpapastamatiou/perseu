import { UpdateTransactionSignature } from '@domain/useCases/transactions/update-transaction';
import { TransactionDTO } from '@presentation/http/dtos/transaction.dto';
import { UpdateTransactionDTO } from '../../dtos/update-transaction.dto';
import { ok } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

type RequestParams = {
  id: string;
};

export class UpdateTransactionController implements Controller {
  constructor(private updateTransaction: UpdateTransactionSignature) {}

  async handle({
    body,
    userId,
    params,
  }: HttpRequest<UpdateTransactionDTO, RequestParams>): Promise<
    HttpResponse<TransactionDTO>
  > {
    const updatedTransaction = await this.updateTransaction.execute(
      {
        id: params.id,
        userId,
      },
      body,
    );

    return ok<TransactionDTO>({
      body: TransactionDTO.fromDomain(updatedTransaction),
    });
  }
}
