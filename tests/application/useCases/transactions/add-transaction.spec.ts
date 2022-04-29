import { AddTransaction } from '@application/useCases/transactions/add-transaction';
import { TransactionTypes } from '@domain/entities/transaction';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { AddAssetStub } from '@tests/application/mocks/useCases/assets/add-asset.stub';
import {
  createMockedAsset,
  mockedAssetData,
} from '@tests/domain/mocks/asset.mock';
import {
  createMockedTransaction,
  mockedTransactionData,
} from '@tests/domain/mocks/transaction.mock';
import { AssetsRepositoryStub } from '@tests/infra/mocks/repositories/assets.repository.stub';
import { TransactionsRepositoryStub } from '@tests/infra/mocks/repositories/transactions.repository.stub';

const makeSut = () => {
  const transactionsRepositoryStub = new TransactionsRepositoryStub();
  const assetsRepositoryStub = new AssetsRepositoryStub();
  const addAssetStub = new AddAssetStub();

  const sut = new AddTransaction(
    transactionsRepositoryStub,
    assetsRepositoryStub,
    addAssetStub,
  );

  return {
    sut,
    transactionsRepositoryStub,
    assetsRepositoryStub,
    addAssetStub,
  };
};

describe('AddTransaction', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should throw if payload quantity is lesser than or equal to zero', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        ...mockedTransactionData,
        quantity: 0,
      }),
    ).rejects.toThrow(InvalidParamException);

    await expect(
      sut.execute({
        ...mockedTransactionData,
        quantity: -10,
      }),
    ).rejects.toThrow(InvalidParamException);
  });

  it('should throw if generateId throws', async () => {
    const { sut, transactionsRepositoryStub } = makeSut();

    jest
      .spyOn(transactionsRepositoryStub, 'generateId')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(sut.execute(mockedTransactionData)).rejects.toThrow();
  });

  it('should throw if generateId fails', async () => {
    const { sut, transactionsRepositoryStub } = makeSut();

    jest
      .spyOn(transactionsRepositoryStub, 'generateId')
      .mockResolvedValueOnce(undefined);

    await expect(sut.execute(mockedTransactionData)).rejects.toThrow();
  });

  it('should be able to add a purchase transaction with a new asset', async () => {
    const {
      sut,
      assetsRepositoryStub,
      transactionsRepositoryStub,
      addAssetStub,
    } = makeSut();

    jest
      .spyOn(assetsRepositoryStub, 'findBySymbol')
      .mockResolvedValueOnce(undefined);

    const transactionsRepositorySpy = jest.spyOn(
      transactionsRepositoryStub,
      'add',
    );

    const addAssetSpy = jest.spyOn(addAssetStub, 'execute');

    const mockedTransaction = createMockedTransaction();

    const response = await sut.execute(mockedTransactionData);

    expect(response).toEqual(mockedTransaction);

    expect(transactionsRepositorySpy).toHaveBeenCalledWith(mockedTransaction);

    expect(addAssetSpy).toHaveBeenCalledWith({
      exchange: mockedTransactionData.exchange,
      symbol: mockedTransactionData.symbol,
      quantity: mockedTransactionData.quantity,
      userId: mockedTransactionData.userId,
      type: '',
    });
  });

  it('should be able to add a purchase transaction and update a existing asset', async () => {
    const {
      sut,
      assetsRepositoryStub,
      transactionsRepositoryStub,
      addAssetStub,
    } = makeSut();

    const transactionsRepositorySpy = jest.spyOn(
      transactionsRepositoryStub,
      'add',
    );

    const assetsRepositorySpy = jest.spyOn(assetsRepositoryStub, 'update');

    const addAssetSpy = jest.spyOn(addAssetStub, 'execute');

    const mockedTransaction = createMockedTransaction();

    const response = await sut.execute(mockedTransactionData);

    expect(response).toEqual(mockedTransaction);

    expect(transactionsRepositorySpy).toHaveBeenCalledWith(mockedTransaction);

    expect(assetsRepositorySpy).toHaveBeenCalledWith({
      ...createMockedAsset(),
      quantity: mockedAssetData.quantity + mockedTransactionData.quantity,
    });

    expect(addAssetSpy).not.toHaveBeenCalled();
  });

  it('should throw when adding a sale transaction for a new asset', async () => {
    const { sut, assetsRepositoryStub } = makeSut();

    jest
      .spyOn(assetsRepositoryStub, 'findBySymbol')
      .mockResolvedValueOnce(undefined);

    await expect(
      sut.execute({
        ...mockedTransactionData,
        type: TransactionTypes.SALE,
      }),
    ).rejects.toThrow(InvalidParamException);
  });

  it('should be able to add a sale transaction and update a existing asset', async () => {
    const {
      sut,
      assetsRepositoryStub,
      transactionsRepositoryStub,
      addAssetStub,
    } = makeSut();

    const transactionsRepositorySpy = jest.spyOn(
      transactionsRepositoryStub,
      'add',
    );

    const assetsRepositorySpy = jest.spyOn(assetsRepositoryStub, 'update');

    const addAssetSpy = jest.spyOn(addAssetStub, 'execute');

    const mockedTransaction = createMockedTransaction();

    const expectedQuantity =
      mockedAssetData.quantity - mockedTransactionData.quantity;

    const expectedResult = {
      ...mockedTransaction,
      type: TransactionTypes.SALE,
    };

    const response = await sut.execute({
      ...mockedTransactionData,
      type: TransactionTypes.SALE,
    });

    expect(response).toEqual(expectedResult);

    expect(transactionsRepositorySpy).toHaveBeenCalledWith(expectedResult);

    expect(assetsRepositorySpy).toHaveBeenCalledWith({
      ...createMockedAsset(),
      quantity: expectedQuantity,
    });

    expect(addAssetSpy).not.toHaveBeenCalled();
  });

  it('should throw when adding a sale transaction if not enough assets', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        ...mockedTransactionData,
        quantity: 100,
        type: TransactionTypes.SALE,
      }),
    ).rejects.toThrow(InvalidParamException);
  });
});