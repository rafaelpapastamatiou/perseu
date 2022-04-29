import {
  CreateTransactionPayload,
  Transaction,
} from '@domain/entities/transaction';

export interface AddTransactionSignature {
  execute(payload: CreateTransactionPayload): Promise<Transaction>;
}
