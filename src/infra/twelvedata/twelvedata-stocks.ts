import { FetchStockResult, Stocks } from '@application/providers/stocks';
import { twelveDataClient } from './twelvedata-client';

type TwelvedataStockInfoData = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
};

type TwelvedataStockData = TwelvedataStockInfoData & {
  type: string;
  mic_code: string;
  country: string;
};

type TwelvedataStocksResponse = {
  data: TwelvedataStockData[];
};

export class TwelvedataStocks implements Stocks {
  private client = twelveDataClient;

  async find(): Promise<FetchStockResult[]> {
    const {
      data: { data: stocks },
    } = await this.client.get<TwelvedataStocksResponse>('stocks');

    return stocks;
  }
}
