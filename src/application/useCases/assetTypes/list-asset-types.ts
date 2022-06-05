import { AssetTypeDTO } from '@application/dtos/asset-type.dto';
import { AssetTypesRepository } from '@application/providers/repositories/asset-types.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type ListAssetTypesInterface = UseCase<[], AssetTypeDTO[]>;

export class ListAssetTypes implements ListAssetTypesInterface {
  constructor(private assetTypesRepository: AssetTypesRepository) {}

  async execute(): Promise<AssetTypeDTO[]> {
    const assetTypes = await this.assetTypesRepository.find();

    return assetTypes.map((assetType) => AssetTypeDTO.fromDomain(assetType));
  }
}
