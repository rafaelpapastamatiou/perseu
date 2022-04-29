import { Asset } from '@domain/entities/asset';
import { FindByIdWithAuth, FindWithAuth } from './repository.protocols';

export interface AssetsRepository {
  findById(params: FindByIdWithAuth): Promise<Asset | undefined>;
  findBySymbol(identifier: FindAssetBySymbol): Promise<Asset | undefined>;
  add(asset: Asset): Promise<void>;
  update(asset: Asset): Promise<void>;
  generateId(): Promise<string>;
}

export type FindAssetBySymbol = FindWithAuth & {
  symbol: string;
};
