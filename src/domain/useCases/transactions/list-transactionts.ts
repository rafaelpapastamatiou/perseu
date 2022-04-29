import { Transaction } from '@domain/entities/transaction';

export interface ListTransactionsSignature {
  execute(identifier: ListTransactionsIdentifier): Promise<Transaction[]>;
}

export type ListTransactionsIdentifier = {
  userId: string;
};
