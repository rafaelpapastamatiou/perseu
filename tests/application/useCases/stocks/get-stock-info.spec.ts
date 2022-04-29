import { GetStockInfo } from '@application/useCases/stocks/get-stock-info';
import { GetStockInfoParams } from '@domain/useCases/stocks/get-stock-info';
import { StocksStub } from '@tests/infra/mocks/providers/stocks.stub';

const makeSut = () => {
  const stocksStub = new StocksStub();
  const sut = new GetStockInfo(stocksStub);

  return {
    sut,
    stocksStub,
  };
};

describe('GetStockInfo', () => {
  it('should throw if stocks.findBySymbol throws', async () => {
    const { sut, stocksStub } = makeSut();

    const err = new Error('Fake stocks.findBySymbol error');

    jest.spyOn(stocksStub, 'findBySymbol').mockImplementationOnce(() => {
      throw err;
    });

    expect(
      sut.execute({
        exchange: 'fake-exchange',
        symbol: 'FAKE',
      }),
    ).rejects.toThrow(err);
  });

  it('should be able to get stock info', async () => {
    const { sut, stocksStub } = makeSut();

    const stocksSpy = jest.spyOn(stocksStub, 'findBySymbol');

    const payload: GetStockInfoParams = {
      symbol: 'FAKE',
      exchange: 'fake-exchange',
    };

    const info = await sut.execute(payload);

    expect(stocksSpy).toHaveBeenCalledWith(payload);

    expect(info.symbol).toBe(payload.symbol);
    expect(info.exchange).toBe(payload.exchange);
    expect(info.currency).toBe('USD');
    expect(info.name).toBe('fake-name');
  });
});
