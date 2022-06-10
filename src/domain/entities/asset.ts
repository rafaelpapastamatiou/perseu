import { AssetType } from './asset-type';
import { Entity } from './entity';

export type CreateAssetPayload = {
  name?: string;
  symbol: string;
  currency: string;
  exchange: string;
  micCode: string;
  country: string;
  typeId: string;
};

export enum AssetTypes {
  Stock = 'Stock',
  REIT = 'REIT',
  ETF = 'ETF',
  Crypto = 'Crypto',
  Index = 'Index',
}

export class Asset extends Entity {
  name: string;
  symbol: string;
  currency: string;
  exchange: string;
  micCode: string;
  country: string;
  typeId: string;
  type?: AssetType;

  private constructor(id: string, payload: CreateAssetPayload) {
    super(id);

    Object.assign(this, payload);
  }

  static create(id: string, payload: CreateAssetPayload): Asset {
    const stock = new Asset(id, payload);

    return stock;
  }
}
