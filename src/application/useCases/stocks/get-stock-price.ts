import { Stocks } from '@application/providers/stocks';
import {
  GetStockPriceParams,
  GetStockPriceSignature,
} from '@domain/useCases/stocks/get-stock-price';

export class GetStockPrice implements GetStockPriceSignature {
  constructor(private stocksProvider: Stocks) {}

  async execute({ symbol, exchange }: GetStockPriceParams): Promise<number> {
    const price = await this.stocksProvider.findPriceBySymbol({
      symbol,
      exchange,
    });

    return price;
  }
}
