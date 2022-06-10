import { Transaction } from '@domain/entities/transaction';
import {
  FindByIdWithAuth,
  FindWithAuth,
} from '../../protocols/repository.protocols';

export interface TransactionsRepository {
  find(params: FindWithAuth): Promise<Transaction[]>;
  findById(params: FindByIdWithAuth): Promise<Transaction | undefined>;
  add(transaction: Transaction): Promise<void>;
  update(transaction: Transaction): Promise<void>;
  generateId(): Promise<string>;
}
