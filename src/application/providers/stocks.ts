export interface Stocks {
  findPriceBySymbol(params: FindStockParams): Promise<number>;
  findBySymbol(params: FindStockParams): Promise<StockResult>;
  find(): Promise<FetchStockResult[]>;
}

export type FindStockParams = {
  symbol: string;
  exchange: string;
};

export type StockResult = {
  symbol: string;
  exchange: string;
  name: string;
  currency: string;
};

export type FetchStockResult = {
  symbol: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
};
