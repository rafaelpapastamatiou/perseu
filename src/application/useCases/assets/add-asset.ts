import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { CreateAssetPayload, Asset } from '@domain/entities/asset';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { AddAssetSignature } from '@domain/useCases/assets/add-asset';

export class AddAsset implements AddAssetSignature {
  constructor(private assetsRepository: AssetsRepository) {}

  async execute(payload: CreateAssetPayload): Promise<Asset> {
    if (payload.quantity <= 0) {
      throw new InvalidParamException(
        'Asset quantity must be greater than zero.',
      );
    }

    const id = await this.assetsRepository.generateId();

    if (!id) {
      throw new Error('Error generating id for asset.');
    }

    const asset = Asset.create(id, payload);

    await this.assetsRepository.add(asset);

    return asset;
  }
}
