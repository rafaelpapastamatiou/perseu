export interface GetStockInfoSignature {
  execute(params: GetStockInfoParams): Promise<GetStockInfoResult>;
}

export type GetStockInfoResult = {
  symbol: string;
  exchange: string;
  name: string;
  currency: string;
};

export type GetStockInfoParams = {
  symbol: string;
  exchange: string;
};
