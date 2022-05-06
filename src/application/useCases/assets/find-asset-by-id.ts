import { AssetDTO } from '@application/dtos/asset.dto';
import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { NotFoundException } from '@domain/exceptions/not-found.exception';
import { UseCase } from '@domain/interfaces/use-case';

export type FindAssetInterface = UseCase<[FindAssetByIdParams], AssetDTO>;

export class FindAssetById implements FindAssetInterface {
  constructor(private assetsRepository: AssetsRepository) {}

  async execute({ id, userId }: FindAssetByIdParams): Promise<AssetDTO> {
    const asset = await this.assetsRepository.findById({
      id,
      userId,
    });

    if (!asset) throw new NotFoundException('Asset not found.');

    return AssetDTO.fromDomain(asset);
  }
}

export type FindAssetByIdParams = {
  userId: string;
  id: string;
};
