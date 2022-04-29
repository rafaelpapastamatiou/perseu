import { AddAsset } from '@application/useCases/assets/add-asset';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import {
  createMockedAsset,
  mockedAssetData,
} from '@tests/domain/mocks/asset.mock';
import { AssetsRepositoryStub } from '@tests/infra/mocks/repositories/assets.repository.stub';

const makeSut = () => {
  const assetsRepositoryStub = new AssetsRepositoryStub();

  const sut = new AddAsset(assetsRepositoryStub);

  return {
    sut,
    assetsRepositoryStub,
  };
};

describe('AddAsset', () => {
  it('should throw if payload quantity is zero or negative', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        ...mockedAssetData,
        quantity: 0,
      }),
    ).rejects.toThrow(InvalidParamException);

    await expect(
      sut.execute({
        ...mockedAssetData,
        quantity: -10,
      }),
    ).rejects.toThrow(InvalidParamException);
  });

  it('should throw if generateId throws', async () => {
    const { sut, assetsRepositoryStub } = makeSut();

    jest
      .spyOn(assetsRepositoryStub, 'generateId')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(sut.execute(mockedAssetData)).rejects.toThrow();
  });

  it('should throw if generateId fails', async () => {
    const { sut, assetsRepositoryStub } = makeSut();

    jest
      .spyOn(assetsRepositoryStub, 'generateId')
      .mockResolvedValueOnce(undefined);

    await expect(sut.execute(mockedAssetData)).rejects.toThrow();
  });

  it('should be able to create a new asset', async () => {
    const { sut, assetsRepositoryStub } = makeSut();

    const assetsRepositorySpy = jest.spyOn(assetsRepositoryStub, 'add');

    const asset = await sut.execute(mockedAssetData);

    expect(asset).toEqual(createMockedAsset());
    expect(assetsRepositorySpy).toHaveBeenCalledWith(asset);
  });
});
