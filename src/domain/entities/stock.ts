import { Entity } from './entity';

export type CreateStockPayload = {
  symbol: string;
  currency: string;
  exchange: string;
  micCode: string;
  country: string;
  type: string;
};

export class Stock extends Entity {
  symbol: string;
  currency: string;
  exchange: string;
  micCode: string;
  country: string;
  type: string;

  private constructor(id: string, payload: CreateStockPayload) {
    super(id);

    Object.assign(this, payload);
  }

  static create(id: string, payload: CreateStockPayload): Stock {
    const stock = new Stock(id, payload);

    return stock;
  }
}
