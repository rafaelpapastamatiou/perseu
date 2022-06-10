export interface Stocks {
  find(): Promise<FetchStockResult[]>;
}

export type FetchStockResult = {
  name: string;
  symbol: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
};
