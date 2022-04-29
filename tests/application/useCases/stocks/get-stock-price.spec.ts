import { GetStockPrice } from '@application/useCases/stocks/get-stock-price';
import { GetStockPriceParams } from '@domain/useCases/stocks/get-stock-price';
import { StocksStub } from '@tests/infra/mocks/providers/stocks.stub';

const makeSut = () => {
  const stocksStub = new StocksStub();
  const sut = new GetStockPrice(stocksStub);

  return { sut, stocksStub };
};

describe('GetStockPrice', () => {
  it('should throws if stocks.findPriceBySymbol throws', async () => {
    const { sut, stocksStub } = makeSut();

    const err = new Error('Fake stocks.findPriceBySymbol error');

    jest.spyOn(stocksStub, 'findPriceBySymbol').mockImplementationOnce(() => {
      throw err;
    });

    expect(
      sut.execute({
        exchange: 'fake-exchange',
        symbol: 'FAKE',
      }),
    ).rejects.toThrow(err);
  });

  it('should be able to retrieve stock price', async () => {
    const { sut, stocksStub } = makeSut();

    const stockSpy = jest.spyOn(stocksStub, 'findPriceBySymbol');

    const payload: GetStockPriceParams = {
      symbol: 'FAKE',
      exchange: 'fake-exchange',
    };

    const price = await sut.execute(payload);

    expect(stockSpy).toHaveBeenCalledWith(payload);
    expect(price).toBe(100);
  });
});
