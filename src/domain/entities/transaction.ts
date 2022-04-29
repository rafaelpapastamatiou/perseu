import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { Entity } from './entity';

export enum TransactionTypes {
  PURCHASE = 'purchase',
  SALE = 'sale',
}

export type CreateTransactionPayload = {
  type: TransactionTypes;
  symbol: string;
  exchange: string;
  quantity: number;
  unitValue: number;
  date: Date;
  userId: string;
};

export type UpdateTransactionPayload = {
  quantity?: number;
  unitValue?: number;
  type?: TransactionTypes;
};

export class Transaction extends Entity {
  type: TransactionTypes;
  symbol: string;
  exchange: string;
  quantity: number;
  unitValue: number;
  date: Date;
  userId: string;

  private constructor(id: string, data: CreateTransactionPayload) {
    super(id);

    Object.assign(this, data);
  }

  static create(id: string, data: CreateTransactionPayload) {
    const transaction = new Transaction(id, data);

    return transaction;
  }

  update(data: UpdateTransactionPayload) {
    if (data.quantity <= 0) {
      throw new InvalidParamException('Quantity must be greater than zero.');
    }

    if (data.unitValue <= 0) {
      throw new InvalidParamException('Unit value must be greater than zero.');
    }

    Object.assign(this, data);
  }
}
