import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { UpdateAssetPayload, Asset } from '@domain/entities/asset';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { NotFoundException } from '@domain/exceptions/not-found.exception';
import { UseCase } from '@domain/interfaces/use-case';

export type UpdateAssetIdentifier = {
  userId: string;
  id: string;
};

export class UpdateAsset implements UseCase {
  constructor(private assetsRepository: AssetsRepository) {}

  async execute(
    { id, userId }: UpdateAssetIdentifier,
    payload: UpdateAssetPayload,
  ): Promise<Asset> {
    if (payload.quantity <= 0) {
      throw new InvalidParamException(
        'Asset quantity must be greater than zero.',
      );
    }

    const asset = await this.assetsRepository.findById({
      id,
      userId,
    });

    if (!asset) {
      throw new NotFoundException('Asset not found.');
    }

    asset.update(payload);

    await this.assetsRepository.update(asset);

    return asset;
  }
}
