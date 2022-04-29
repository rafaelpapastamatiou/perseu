import { Asset, UpdateAssetPayload } from '@domain/entities/asset';

export interface UpdateAssetSignature {
  execute(
    identifier: UpdateAssetIdentifier,
    payload: UpdateAssetPayload,
  ): Promise<Asset>;
}

export type UpdateAssetIdentifier = {
  userId: string;
  id: string;
};
