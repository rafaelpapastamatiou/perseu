import {
  GetAssetPrice,
  GetAssetPriceParams,
} from '@application/useCases/assets/get-asset-price';
import { StocksStub } from '@tests/infra/mocks/providers/stocks.stub';

const makeSut = () => {
  const stocksStub = new StocksStub();
  const sut = new GetAssetPrice(stocksStub);

  return { sut, stocksStub };
};

describe('GetAssetPrice', () => {
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

    const payload: GetAssetPriceParams = {
      symbol: 'FAKE',
      exchange: 'fake-exchange',
    };

    const price = await sut.execute(payload);

    expect(stockSpy).toHaveBeenCalledWith(payload);
    expect(price).toBe(100);
  });
});
