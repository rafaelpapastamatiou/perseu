export interface Etfs {
  find(): Promise<FetchEtfResult[]>;
}

export type FetchEtfResult = {
  name: string;
  symbol: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
};
