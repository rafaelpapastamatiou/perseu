import { UserAssetDTO } from '@application/dtos/user-asset.dto';
import { UsersAssetsRepository } from '@application/providers/repositories/users-assets.repository';
import { NotFoundException } from '@domain/exceptions/not-found.exception';
import { UseCase } from '@domain/interfaces/use-case';

export type FindAssetInterface = UseCase<
  [FindUserAssetByIdParams],
  UserAssetDTO
>;

export class FindAssetById implements FindAssetInterface {
  constructor(private assetsRepository: UsersAssetsRepository) {}

  async execute({
    id,
    userId,
  }: FindUserAssetByIdParams): Promise<UserAssetDTO> {
    const userAsset = await this.assetsRepository.findById({
      id,
      userId,
    });

    if (!userAsset) throw new NotFoundException('UserAsset not found.');

    return UserAssetDTO.fromDomain(userAsset);
  }
}

export type FindUserAssetByIdParams = {
  userId: string;
  id: string;
};
