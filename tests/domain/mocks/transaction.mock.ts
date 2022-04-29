import {
  CreateTransactionPayload,
  Transaction,
  TransactionTypes,
} from '@domain/entities/transaction';
import { UpdateTransactionIdentifier } from '@domain/useCases/transactions/update-transaction';

export const mockedTransactionData: CreateTransactionPayload = {
  date: new Date(),
  exchange: 'fake-exchange',
  quantity: 10,
  symbol: 'FAKE',
  type: TransactionTypes.PURCHASE,
  unitValue: 5,
  userId: 'fake-user-id',
};

export const mockedTransactionId = '507f191e810c19729de860ea';

export const createMockedTransaction = () =>
  Transaction.create(mockedTransactionId, mockedTransactionData);

export const mockedAssetIdentifier: UpdateTransactionIdentifier = {
  id: 'fake-id',
  userId: 'fake-user-id',
};
