import { TransactionDTO } from '@application/dtos/transaction.dto';
import {
  PaginationConfig,
  PaginationResult,
} from '@application/protocols/pagination.protocols';
import { TransactionsRepository } from '@application/providers/repositories/transactions.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type ListTransactionsIdentifier = {
  userId: string;
};

export type ListTransactionsInterface = UseCase<
  [ListTransactionsIdentifier, PaginationConfig],
  PaginationResult<TransactionDTO>
>;

export class ListTransactions implements ListTransactionsInterface {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(
    { userId }: ListTransactionsIdentifier,
    paginationCofig: PaginationConfig,
  ): Promise<PaginationResult<TransactionDTO>> {
    const { data, ...result } = await this.transactionsRepository.find(
      {
        userId,
      },
      paginationCofig,
    );

    return {
      ...result,
      data: data.map((transaction) => TransactionDTO.fromDomain(transaction)),
    };
  }
}
