import { Asset } from '@domain/entities/asset';

export interface AssetsRepository {
  find(): Promise<Asset[]>;
  findBySymbol(params: FindAssetBySymbol): Promise<Asset | undefined>;
  import(exchanges: Asset[]): Promise<void>;
  generateId(): Promise<string>;
}

export type FindAssetBySymbol = {
  exchange: string;
  symbol: string;
};
