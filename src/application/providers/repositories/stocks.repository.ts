import { Stock } from '@domain/entities/stock';

export interface StocksRepository {
  find(): Promise<Stock[]>;
  findBySymbol(params: FindStockBySymbol): Promise<Stock | undefined>;
  import(exchanges: Stock[]): Promise<void>;
  generateId(): Promise<string>;
}

export type FindStockBySymbol = {
  exchange: string;
  symbol: string;
};
