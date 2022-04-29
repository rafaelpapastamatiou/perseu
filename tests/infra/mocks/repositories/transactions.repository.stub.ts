import { TransactionsRepository } from '@application/providers/repositories/transactions.repository';
import { Transaction } from '@domain/entities/transaction';
import {
  createMockedTransaction,
  mockedTransactionId,
} from '@tests/domain/mocks/transaction.mock';

export class TransactionsRepositoryStub implements TransactionsRepository {
  async find(): Promise<Transaction[]> {
    return [createMockedTransaction()];
  }

  async findById(): Promise<Transaction> {
    return createMockedTransaction();
  }

  async add(): Promise<void> {
    return;
  }

  async update(): Promise<void> {
    return;
  }

  async generateId(): Promise<string> {
    return mockedTransactionId;
  }
}
