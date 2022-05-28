export interface Stocks {
  findPriceBySymbol(params: FindStockParams): Promise<number>;
  find(): Promise<FetchStockResult[]>;
}

export type FindStockParams = {
  symbol: string;
  exchange: string;
};

export type FetchStockResult = {
  name: string;
  symbol: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
};
