import { Asset, CreateAssetPayload } from '@domain/entities/asset';

export interface AddAssetSignature {
  execute(payload: CreateAssetPayload): Promise<Asset>;
}
