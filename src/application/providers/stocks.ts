export interface Stocks {
  findPriceBySymbol(params: FindStockParams): Promise<number>;
  findBySymbol(params: FindStockParams): Promise<StockResult>;
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
