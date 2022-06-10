import {
  GetAssetPrice,
  GetAssetPriceParams,
} from '@application/useCases/assets/get-asset-price';
import { AssetsStub } from '@tests/infra/mocks/providers/assets.stub';

const makeSut = () => {
  const assetsStub = new AssetsStub();
  const sut = new GetAssetPrice(assetsStub);

  return { sut, assetsStub };
};

describe('GetAssetPrice', () => {
  it('should throws if stocks.findPriceBySymbol throws', async () => {
    const { sut, assetsStub } = makeSut();

    const err = new Error('Fake stocks.findPriceBySymbol error');

    jest.spyOn(assetsStub, 'getPriceBySymbol').mockImplementationOnce(() => {
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
    const { sut, assetsStub } = makeSut();

    const stockSpy = jest.spyOn(assetsStub, 'getPriceBySymbol');

    const payload: GetAssetPriceParams = {
      symbol: 'FAKE',
      exchange: 'fake-exchange',
    };

    const price = await sut.execute(payload);

    expect(stockSpy).toHaveBeenCalledWith(payload);
    expect(price).toBe(100);
  });
});
