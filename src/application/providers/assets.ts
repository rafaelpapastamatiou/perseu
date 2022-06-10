export interface AssetsProvider {
  getPriceBySymbol(params: FindAssetParams): Promise<number>;
  getEodPriceBySymbol(params: FindAssetParams): Promise<number>;
}
export type FindAssetParams = {
  symbol: string;
  exchange: string;
};
