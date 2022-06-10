export interface AssetsProvider {
  getPriceBySymbol(params: FindAssetParams): Promise<number>;
  getEodPriceBySymbol(params: FindAssetParams): Promise<number>;
  getProfile(params: FindAssetParams): Promise<GetAssetProfileResult>;
}

export type FindAssetParams = {
  symbol: string;
  exchange: string;
};

export type GetAssetProfileResult = {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  employees: number;
  website: string;
  description: string;
  type: string;
  CEO: string;
  address: string;
  city: string;
  zip: string;
  state: string;
  country: string;
  phone: string;
  logo?: string;
};
