import {
  GetAssetInfo,
  GetAssetInfoParams,
} from '@application/useCases/assets/get-asset-info';
import { AssetsRepositoryStub } from '@tests/infra/mocks/repositories/assets.repository.stub';

const makeSut = () => {
  const assetsRepositoryStub = new AssetsRepositoryStub();
  const sut = new GetAssetInfo(assetsRepositoryStub);

  return {
    sut,
    assetsRepositoryStub,
  };
};

describe('GetAssetInfo', () => {
  it('should throw if stocks.findBySymbol throws', async () => {
    const { sut, assetsRepositoryStub } = makeSut();

    const err = new Error('Fake stocks.findBySymbol error');

    jest
      .spyOn(assetsRepositoryStub, 'findBySymbol')
      .mockImplementationOnce(() => {
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
    const { sut, assetsRepositoryStub } = makeSut();

    const stocksSpy = jest.spyOn(assetsRepositoryStub, 'findBySymbol');

    const payload: GetAssetInfoParams = {
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
