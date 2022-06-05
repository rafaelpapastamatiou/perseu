import { AssetType } from '@domain/entities/asset-type';

export class AssetTypeDTO {
  id: string;
  name: string;

  static fromDomain(assetType: AssetType): AssetTypeDTO {
    const dto = new AssetTypeDTO();

    dto.id = assetType.id;
    dto.name = assetType.name;

    return dto;
  }
}
