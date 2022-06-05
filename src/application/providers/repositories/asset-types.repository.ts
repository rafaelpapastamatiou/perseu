import { AssetType } from '@domain/entities/asset-type';

export interface AssetTypesRepository {
  find(): Promise<AssetType[]>;
}
