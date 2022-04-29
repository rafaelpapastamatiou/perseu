import {
  Transaction,
  UpdateTransactionPayload,
} from '@domain/entities/transaction';

export interface UpdateTransactionSignature {
  execute(
    identifier: UpdateTransactionIdentifier,
    payload: UpdateTransactionPayload,
  ): Promise<Transaction>;
}

export type UpdateTransactionIdentifier = {
  id: string;
  userId: string;
};
