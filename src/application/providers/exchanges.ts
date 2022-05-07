export interface ExchangesProvider {
  find(): Promise<FindExchangesData>;
}

export type FindExchangesData = {
  name: string;
  code: string;
  country: string;
  timezone: string;
}[];
