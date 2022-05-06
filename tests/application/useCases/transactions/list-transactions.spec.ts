import { TransactionDTO } from '@application/dtos/transaction.dto';
import { ListTransactions } from '@application/useCases/transactions/list-transactions';
import { createMockedTransaction } from '@tests/domain/mocks/transaction.mock';
import { TransactionsRepositoryStub } from '@tests/infra/mocks/repositories/transactions.repository.stub';

function makeSut() {
  const transactionsRepositoryStub = new TransactionsRepositoryStub();
  const sut = new ListTransactions(transactionsRepositoryStub);

  return {
    sut,
    transactionsRepositoryStub,
  };
}

describe('List Transactions', () => {
  it('should throw if transactions repository throws', async () => {
    const { sut, transactionsRepositoryStub } = makeSut();

    const err = new Error('transactionsRepositoryStub.find() error');

    jest
      .spyOn(transactionsRepositoryStub, 'find')
      .mockImplementationOnce(() => {
        throw err;
      });

    await expect(sut.execute({ userId: 'fake-id' })).rejects.toThrow(err);
  });

  it('should be able to list user transactions', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ userId: 'fake-id' });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(
      TransactionDTO.fromDomain(createMockedTransaction()),
    );
  });
});
