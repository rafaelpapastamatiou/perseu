import { UpdateTransaction } from '@application/useCases/transactions/update-transaction';
import {
  UpdateTransactionRequestDTO,
  UpdateTransactionResponseDTO,
} from '@presentation/http/dtos/update-transaction.dto';
import { ok } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

type RequestParams = {
  id: string;
};

export class UpdateTransactionController implements Controller {
  constructor(private updateTransaction: UpdateTransaction) {}

  async handle({
    body,
    userId,
    params,
  }: HttpRequest<UpdateTransactionRequestDTO, RequestParams>): Promise<
    HttpResponse<UpdateTransactionResponseDTO>
  > {
    const updatedTransaction = await this.updateTransaction.execute(
      {
        id: params.id,
        userId,
      },
      body,
    );

    return ok<UpdateTransactionResponseDTO>({
      body: updatedTransaction,
    });
  }
}
