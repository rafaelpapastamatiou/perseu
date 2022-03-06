export interface GetStockPriceSignature {
  execute(params: GetStockPriceParams): Promise<number>;
}

export type GetStockPriceParams = {
  symbol: string;
  exchange: string;
};
