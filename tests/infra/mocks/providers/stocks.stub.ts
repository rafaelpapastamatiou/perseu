import { FetchStockResult, Stocks } from '@application/providers/stocks';

export class StocksStub implements Stocks {
  async findPriceBySymbol(): Promise<number> {
    return 100;
  }

  async find(): Promise<FetchStockResult[]> {
    return [
      {
        name: 'fake name',
        symbol: 'fake-symbol',
        exchange: 'fake-exchange',
        currency: 'USD',
        country: 'fake-country',
        mic_code: 'fake-mic-mode',
        type: 'fake-type',
      },
    ];
  }
}
