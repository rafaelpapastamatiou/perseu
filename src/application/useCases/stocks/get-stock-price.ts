import { Stocks } from '@application/providers/stocks';
import { UseCase } from '@domain/interfaces/use-case';

export type GetStockPriceParams = {
  symbol: string;
  exchange: string;
};

export type GetStockPriceInterface = UseCase<[GetStockPriceParams], number>;

export class GetStockPrice implements GetStockPriceInterface {
  constructor(private stocksProvider: Stocks) {}

  async execute({ symbol, exchange }: GetStockPriceParams): Promise<number> {
    const price = await this.stocksProvider.findPriceBySymbol({
      symbol,
      exchange,
    });

    return price;
  }
}
