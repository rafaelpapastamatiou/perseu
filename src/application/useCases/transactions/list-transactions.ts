import { TransactionsRepository } from '@application/providers/repositories/transactions.repository';
import { Transaction } from '@domain/entities/transaction';
import {
  ListTransactionsIdentifier,
  ListTransactionsSignature,
} from '@domain/useCases/transactions/list-transactionts';

export class ListTransactions implements ListTransactionsSignature {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
  }: ListTransactionsIdentifier): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.find({ userId });

    return transactions;
  }
}
