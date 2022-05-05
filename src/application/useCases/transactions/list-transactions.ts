import { TransactionDTO } from '@application/dtos/transaction.dto';
import { TransactionsRepository } from '@application/providers/repositories/transactions.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type ListTransactionsIdentifier = {
  userId: string;
};

export class ListTransactions implements UseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
  }: ListTransactionsIdentifier): Promise<TransactionDTO[]> {
    const transactions = await this.transactionsRepository.find({ userId });

    return transactions.map((transaction) =>
      TransactionDTO.fromDomain(transaction),
    );
  }
}
