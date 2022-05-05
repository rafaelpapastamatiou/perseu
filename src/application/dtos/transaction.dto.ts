import { Transaction, TransactionTypes } from '@domain/entities/transaction';

export class TransactionDTO {
  id: string;

  type: TransactionTypes;

  symbol: string;

  exchange: string;

  quantity: number;

  unitValue: number;

  date: string;

  static fromDomain(transaction: Transaction): TransactionDTO {
    const dto = new TransactionDTO();

    dto.id = transaction.id;
    dto.type = transaction.type;
    dto.symbol = transaction.symbol;
    dto.exchange = transaction.exchange;
    dto.quantity = transaction.quantity;
    dto.unitValue = transaction.unitValue;
    dto.date = transaction.date.toISOString();

    return dto;
  }
}
