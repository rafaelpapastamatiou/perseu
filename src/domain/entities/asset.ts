import { Entity } from './entity';

export type CreateAssetPayload = {
  name?: string;
  symbol: string;
  currency: string;
  exchange: string;
  micCode: string;
  country: string;
  type: string;
};

export enum AssetTypes {
  Stock = 'Stock',
  REIT = 'REIT',
  ETF = 'ETF',
}

export class Asset extends Entity {
  name: string;
  symbol: string;
  currency: string;
  exchange: string;
  micCode: string;
  country: string;
  type: AssetTypes;

  private constructor(id: string, payload: CreateAssetPayload) {
    super(id);

    Object.assign(this, payload);
  }

  static create(id: string, payload: CreateAssetPayload): Asset {
    const stock = new Asset(id, payload);

    return stock;
  }
}
