import { Entity } from './entity';

export type CreateAssetTypePayload = {
  name: string;
  labels: string[];
};

export class AssetType extends Entity {
  name: string;
  labels: string[];

  private constructor(id: string, payload: CreateAssetTypePayload) {
    super(id);

    Object.assign(this, payload);
  }

  static create(id: string, payload: CreateAssetTypePayload) {
    const assetType = new AssetType(id, payload);

    return assetType;
  }
}
