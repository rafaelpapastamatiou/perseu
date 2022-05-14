import { UpdateUserAsset } from '@application/useCases/usersAssets/update-user-asset';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { NotFoundException } from '@domain/exceptions/not-found.exception';
import {
  createMockedUserAsset,
  mockedUserAssetIdentifier,
} from '@tests/domain/mocks/user-asset.mock';
import { UsersAssetsRepositoryStub } from '@tests/infra/mocks/repositories/users-assets.repository.stub';

const makeSut = () => {
  const usersAssetsRepositoryStub = new UsersAssetsRepositoryStub();

  const sut = new UpdateUserAsset(usersAssetsRepositoryStub);

  return {
    sut,
    usersAssetsRepositoryStub,
  };
};

describe('UpdateAsset', () => {
  it('should throw if payload quantity is zero or negative', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute(mockedUserAssetIdentifier, { quantity: 0 }),
    ).rejects.toThrow(InvalidParamException);

    await expect(
      sut.execute(mockedUserAssetIdentifier, { quantity: -10 }),
    ).rejects.toThrow(InvalidParamException);
  });

  it('should throw if assetsRepository.findById throws', async () => {
    const { sut, usersAssetsRepositoryStub } = makeSut();

    const err = new Error('Fake assetsRepository.findById error');

    jest
      .spyOn(usersAssetsRepositoryStub, 'findById')
      .mockImplementationOnce(() => {
        throw err;
      });

    await expect(
      sut.execute(mockedUserAssetIdentifier, { quantity: 10 }),
    ).rejects.toThrow(err);
  });

  it('should throw if asset not found', async () => {
    const { sut, usersAssetsRepositoryStub } = makeSut();

    jest
      .spyOn(usersAssetsRepositoryStub, 'findById')
      .mockResolvedValueOnce(undefined);

    await expect(
      sut.execute(mockedUserAssetIdentifier, { quantity: 10 }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should be able to update user asset data', async () => {
    const { sut, usersAssetsRepositoryStub } = makeSut();

    const assetsRepositorySpy = jest.spyOn(usersAssetsRepositoryStub, 'update');

    const asset = await sut.execute(mockedUserAssetIdentifier, { quantity: 5 });

    expect(asset).toEqual({
      ...createMockedUserAsset(),
      quantity: 5,
    });
    expect(assetsRepositorySpy).toHaveBeenCalledWith(asset);
  });
});
