import { UpdateTransaction } from '@application/useCases/transactions/update-transaction';
import { Asset } from '@domain/entities/asset';
import {
  Transaction,
  TransactionTypes,
  UpdateTransactionPayload,
} from '@domain/entities/transaction';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { NotFoundException } from '@domain/exceptions/not-found.exception';
import {
  createMockedAsset,
  mockedAssetData,
  mockedAssetId,
} from '@tests/domain/mocks/asset.mock';
import {
  createMockedTransaction,
  mockedTransactionData,
  mockedTransactionId,
} from '@tests/domain/mocks/transaction.mock';
import { AssetsRepositoryStub } from '@tests/infra/mocks/repositories/assets.repository.stub';
import { TransactionsRepositoryStub } from '@tests/infra/mocks/repositories/transactions.repository.stub';

const makeSut = () => {
  const transactionsRepositoryStub = new TransactionsRepositoryStub();
  const assetsRepositoryStub = new AssetsRepositoryStub();

  const sut = new UpdateTransaction(
    transactionsRepositoryStub,
    assetsRepositoryStub,
  );

  return {
    sut,
    transactionsRepositoryStub,
    assetsRepositoryStub,
  };
};

describe('UpdateTransaction', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should throw if payload quantity is lesser than or equal to zero', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute(
        {
          id: mockedTransactionId,
          userId: 'fake-user-id',
        },
        { quantity: 0, type: TransactionTypes.PURCHASE, unitValue: 5 },
      ),
    ).rejects.toThrow(InvalidParamException);

    await expect(
      sut.execute(
        {
          id: mockedTransactionId,
          userId: 'fake-user-id',
        },
        { quantity: -10, type: TransactionTypes.PURCHASE, unitValue: 5 },
      ),
    ).rejects.toThrow(InvalidParamException);
  });

  it('should throw if transaction not found', async () => {
    const { sut, transactionsRepositoryStub } = makeSut();

    jest
      .spyOn(transactionsRepositoryStub, 'findById')
      .mockResolvedValueOnce(undefined);

    await expect(
      sut.execute(
        {
          id: mockedTransactionId,
          userId: 'fake-user-id',
        },
        { quantity: 20, type: TransactionTypes.PURCHASE, unitValue: 5 },
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw if asset not found', async () => {
    const { sut, assetsRepositoryStub } = makeSut();

    jest
      .spyOn(assetsRepositoryStub, 'findBySymbol')
      .mockResolvedValueOnce(undefined);

    await expect(
      sut.execute(
        {
          id: mockedTransactionId,
          userId: 'fake-user-id',
        },
        { quantity: 20, type: TransactionTypes.PURCHASE, unitValue: 5 },
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw if trying to sell more assets than owned', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute(
        {
          id: mockedTransactionId,
          userId: 'fake-user-id',
        },
        { quantity: 1000, type: TransactionTypes.SALE, unitValue: 5 },
      ),
    ).rejects.toThrow(InvalidParamException);
  });

  it('should be able to update a purchase transaction asset quantity', async () => {
    const { sut, transactionsRepositoryStub, assetsRepositoryStub } = makeSut();

    const transactionsRepositorySpy = jest.spyOn(
      transactionsRepositoryStub,
      'update',
    );

    const assetsRepositorySpy = jest.spyOn(assetsRepositoryStub, 'update');

    const payload: UpdateTransactionPayload = {
      quantity: 5,
      type: TransactionTypes.PURCHASE,
      unitValue: 5,
    };

    const mockedTransaction = createMockedTransaction();

    const response = await sut.execute(
      {
        id: mockedTransactionId,
        userId: 'fake-user-id',
      },
      payload,
    );

    expect(response).toEqual({
      ...mockedTransaction,
      ...payload,
    });

    expect(transactionsRepositorySpy).toHaveBeenCalledWith({
      ...mockedTransaction,
      ...payload,
    });

    expect(assetsRepositorySpy).toHaveBeenCalledWith({
      ...createMockedAsset(),
      quantity:
        mockedAssetData.quantity -
        mockedTransactionData.quantity +
        payload.quantity,
    });
  });

  it('should be able to switch transaction type from purchase to sale', async () => {
    const { sut, transactionsRepositoryStub, assetsRepositoryStub } = makeSut();

    const transactionsRepositorySpy = jest.spyOn(
      transactionsRepositoryStub,
      'update',
    );

    const assetsRepositorySpy = jest.spyOn(assetsRepositoryStub, 'update');

    const mockedAssetQuantity = 20;
    const asset = Asset.create(mockedAssetId, {
      ...mockedAssetData,
      quantity: mockedAssetQuantity,
    });

    jest
      .spyOn(assetsRepositoryStub, 'findBySymbol')
      .mockResolvedValueOnce(asset);

    const payload: UpdateTransactionPayload = {
      quantity: 5,
      type: TransactionTypes.SALE,
      unitValue: 5,
    };

    const mockedTransaction = createMockedTransaction();

    const response = await sut.execute(
      {
        id: mockedTransactionId,
        userId: 'fake-user-id',
      },
      payload,
    );

    expect(response).toEqual({
      ...mockedTransaction,
      ...payload,
    });

    expect(transactionsRepositorySpy).toHaveBeenCalledWith({
      ...mockedTransaction,
      ...payload,
    });

    expect(assetsRepositorySpy).toHaveBeenCalledWith({
      ...createMockedAsset(),
      quantity:
        mockedAssetQuantity - mockedTransactionData.quantity - payload.quantity,
    });
  });

  it('should be able to update a sale transaction asset quantity', async () => {
    const { sut, transactionsRepositoryStub, assetsRepositoryStub } = makeSut();

    const transaction = Transaction.create(mockedTransactionId, {
      ...mockedTransactionData,
      type: TransactionTypes.SALE,
    });

    jest
      .spyOn(transactionsRepositoryStub, 'findById')
      .mockResolvedValueOnce(transaction);

    const transactionsRepositorySpy = jest.spyOn(
      transactionsRepositoryStub,
      'update',
    );

    const assetsRepositorySpy = jest.spyOn(assetsRepositoryStub, 'update');

    const payload: UpdateTransactionPayload = {
      quantity: 5,
      type: TransactionTypes.SALE,
      unitValue: 5,
    };

    const mockedTransaction = createMockedTransaction();

    const response = await sut.execute(
      {
        id: mockedTransactionId,
        userId: 'fake-user-id',
      },
      payload,
    );

    expect(response).toEqual({
      ...mockedTransaction,
      ...payload,
    });

    expect(transactionsRepositorySpy).toHaveBeenCalledWith({
      ...mockedTransaction,
      ...payload,
    });

    expect(assetsRepositorySpy).toHaveBeenCalledWith({
      ...createMockedAsset(),
      quantity:
        mockedAssetData.quantity +
        mockedTransactionData.quantity -
        payload.quantity,
    });
  });

  it('should be able to switch transaction type from sale to purchase', async () => {
    const { sut, transactionsRepositoryStub, assetsRepositoryStub } = makeSut();

    const transaction = Transaction.create(mockedTransactionId, {
      ...mockedTransactionData,
      type: TransactionTypes.SALE,
    });

    jest
      .spyOn(transactionsRepositoryStub, 'findById')
      .mockResolvedValueOnce(transaction);

    const transactionsRepositorySpy = jest.spyOn(
      transactionsRepositoryStub,
      'update',
    );

    const assetsRepositorySpy = jest.spyOn(assetsRepositoryStub, 'update');

    const payload: UpdateTransactionPayload = {
      quantity: 5,
      type: TransactionTypes.PURCHASE,
      unitValue: 5,
    };

    const mockedTransaction = createMockedTransaction();

    const response = await sut.execute(
      {
        id: mockedTransactionId,
        userId: 'fake-user-id',
      },
      payload,
    );

    expect(response).toEqual({
      ...mockedTransaction,
      ...payload,
    });

    expect(transactionsRepositorySpy).toHaveBeenCalledWith({
      ...mockedTransaction,
      ...payload,
    });

    expect(assetsRepositorySpy).toHaveBeenCalledWith({
      ...createMockedAsset(),
      quantity:
        mockedAssetData.quantity +
        mockedTransactionData.quantity +
        payload.quantity,
    });
  });
});
