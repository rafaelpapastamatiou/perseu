import { twelveDataClient } from './twelvedata-client';
import { Etfs, FetchEtfResult } from '@application/providers/etfs';

type TwelvedataEtfInfoData = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
};

type TwelvedataEtfData = TwelvedataEtfInfoData & {
  type: string;
  mic_code: string;
  country: string;
};

type TwelvedataEtfsResponse = {
  data: TwelvedataEtfData[];
};

export class TwelvedataEtfs implements Etfs {
  private client = twelveDataClient;

  async find(): Promise<FetchEtfResult[]> {
    const {
      data: { data: etfs },
    } = await this.client.get<TwelvedataEtfsResponse>('etfs');

    return etfs;
  }
}
