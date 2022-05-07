import {
  ExchangesProvider,
  FindExchangesData,
} from '@application/providers/exchanges';
import { twelveDataClient } from './twelvedata-client';

type TwelvedataExchangesData = {
  name: string;
  code: string;
  country: string;
  timezone: string;
};

type TwelvedataExchangesResponse = {
  data: TwelvedataExchangesData[];
};

export class TwelvedataExchanges implements ExchangesProvider {
  private client = twelveDataClient;

  async find(): Promise<FindExchangesData> {
    const {
      data: { data: exchanges },
    } = await this.client.get<TwelvedataExchangesResponse>('exchanges');

    return exchanges;
  }
}
