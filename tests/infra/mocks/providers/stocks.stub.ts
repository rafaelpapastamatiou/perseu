import {
  FindStockParams,
  StockResult,
  Stocks,
} from '@application/providers/stocks';

export class StocksStub implements Stocks {
  async findPriceBySymbol(): Promise<number> {
    return 100;
  }

  async findBySymbol(params: FindStockParams): Promise<StockResult> {
    return {
      symbol: params.symbol,
      exchange: params.exchange,
      currency: 'USD',
      name: 'fake-name',
    };
  }
}
