import { Stocks } from '@application/providers/stocks';
import {
  GetStockInfoParams,
  GetStockInfoResult,
  GetStockInfoSignature,
} from '@domain/useCases/stocks/get-stock-info';

export class GetStockInfo implements GetStockInfoSignature {
  constructor(private stocksProvider: Stocks) {}

  async execute({
    symbol,
    exchange,
  }: GetStockInfoParams): Promise<GetStockInfoResult> {
    const stock = await this.stocksProvider.findBySymbol({
      symbol,
      exchange,
    });

    return stock;
  }
}
