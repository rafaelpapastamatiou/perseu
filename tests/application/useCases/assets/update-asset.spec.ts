import { UpdateAsset } from '@application/useCases/assets/update-asset';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { NotFoundException } from '@domain/exceptions/not-found.exception';
import {
  createMockedAsset,
  mockedAssetIdentifier,
} from '@tests/domain/mocks/asset.mock';
import { AssetsRepositoryStub } from '@tests/infra/mocks/repositories/assets.repository.stub';

const makeSut = () => {
  const assetsRepositoryStub = new AssetsRepositoryStub();

  const sut = new UpdateAsset(assetsRepositoryStub);

  return {
    sut,
    assetsRepositoryStub,
  };
};

describe('UpdateAsset', () => {
  it('should throw if payload quantity is zero or negative', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute(mockedAssetIdentifier, { quantity: 0 }),
    ).rejects.toThrow(InvalidParamException);

    await expect(
      sut.execute(mockedAssetIdentifier, { quantity: -10 }),
    ).rejects.toThrow(InvalidParamException);
  });

  it('should throw if assetsRepository.findById throws', async () => {
    const { sut, assetsRepositoryStub } = makeSut();

    const err = new Error('Fake assetsRepository.findById error');

    jest.spyOn(assetsRepositoryStub, 'findById').mockImplementationOnce(() => {
      throw err;
    });

    await expect(
      sut.execute(mockedAssetIdentifier, { quantity: 10 }),
    ).rejects.toThrow(err);
  });

  it('should throw if asset not found', async () => {
    const { sut, assetsRepositoryStub } = makeSut();

    jest
      .spyOn(assetsRepositoryStub, 'findById')
      .mockResolvedValueOnce(undefined);

    await expect(
      sut.execute(mockedAssetIdentifier, { quantity: 10 }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should be able to update user asset data', async () => {
    const { sut, assetsRepositoryStub } = makeSut();

    const assetsRepositorySpy = jest.spyOn(assetsRepositoryStub, 'update');

    const asset = await sut.execute(mockedAssetIdentifier, { quantity: 5 });

    expect(asset).toEqual({
      ...createMockedAsset(),
      quantity: 5,
    });
    expect(assetsRepositorySpy).toHaveBeenCalledWith(asset);
  });
});
