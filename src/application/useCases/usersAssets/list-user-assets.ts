import { UserAssetDTO } from '@application/dtos/user-asset.dto';
import {
  PaginationConfig,
  PaginationResult,
} from '@application/protocols/pagination.protocols';
import { FindWithAuth } from '@application/protocols/repository.protocols';
import { UserAssetsRepository } from '@application/providers/repositories/user-assets.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type ListUserAssetsInterface = UseCase<
  [FindWithAuth, PaginationConfig],
  PaginationResult<UserAssetDTO>
>;

export class ListUserAssets implements ListUserAssetsInterface {
  constructor(private userAssetsRepository: UserAssetsRepository) {}
  async execute(
    { userId }: FindWithAuth,
    paginationConfig: PaginationConfig,
  ): Promise<any> {
    const { data, ...pagination } = await this.userAssetsRepository.find(
      {
        userId,
      },
      paginationConfig,
    );

    return {
      ...pagination,
      data: data.map((userAsset) => UserAssetDTO.fromDomain(userAsset)),
    };
  }
}
