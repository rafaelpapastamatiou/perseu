import { Stocks } from '@application/providers/stocks';
import { UseCase } from '@domain/interfaces/use-case';

export type GetStockInfoResult = {
  symbol: string;
  exchange: string;
  name: string;
  currency: string;
};

export type GetStockInfoParams = {
  symbol: string;
  exchange: string;
};

export type GetStockInfoInterface = UseCase<
  [GetStockInfoParams],
  GetStockInfoResult
>;

export class GetStockInfo implements GetStockInfoInterface {
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
