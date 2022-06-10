import { AddUserAsset } from '@application/useCases/usersAssets/add-user-asset';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import {
  createMockedUserAsset,
  mockedUserAssetData,
} from '@tests/domain/mocks/user-asset.mock';
import { UserAssetsRepositoryStub } from '@tests/infra/mocks/repositories/user-assets.repository.stub';

const makeSut = () => {
  const usersAssetsRepositoryStub = new UserAssetsRepositoryStub();

  const sut = new AddUserAsset(usersAssetsRepositoryStub);

  return {
    sut,
    usersAssetsRepositoryStub,
  };
};

describe('AddAsset', () => {
  it('should throw if payload quantity is zero or negative', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        ...mockedUserAssetData,
        quantity: 0,
      }),
    ).rejects.toThrow(InvalidParamException);

    await expect(
      sut.execute({
        ...mockedUserAssetData,
        quantity: -10,
      }),
    ).rejects.toThrow(InvalidParamException);
  });

  it('should throw if generateId throws', async () => {
    const { sut, usersAssetsRepositoryStub } = makeSut();

    jest
      .spyOn(usersAssetsRepositoryStub, 'generateId')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(sut.execute(mockedUserAssetData)).rejects.toThrow();
  });

  it('should throw if generateId fails', async () => {
    const { sut, usersAssetsRepositoryStub } = makeSut();

    jest
      .spyOn(usersAssetsRepositoryStub, 'generateId')
      .mockResolvedValueOnce(undefined);

    await expect(sut.execute(mockedUserAssetData)).rejects.toThrow();
  });

  it('should be able to create a new asset', async () => {
    const { sut, usersAssetsRepositoryStub } = makeSut();

    const assetsRepositorySpy = jest.spyOn(usersAssetsRepositoryStub, 'add');

    const asset = await sut.execute(mockedUserAssetData);

    expect(asset).toEqual(createMockedUserAsset());
    expect(assetsRepositorySpy).toHaveBeenCalledWith(asset);
  });
});
