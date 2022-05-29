import { Stocks } from '@application/providers/stocks';
import { UseCase } from '@domain/interfaces/use-case';

export type GetAssetPriceParams = {
  symbol: string;
  exchange: string;
};

export type GetAssetPriceInterface = UseCase<[GetAssetPriceParams], number>;

export class GetAssetPrice implements GetAssetPriceInterface {
  constructor(private stocksProvider: Stocks) {}

  async execute({ symbol, exchange }: GetAssetPriceParams): Promise<number> {
    const price = await this.stocksProvider.findPriceBySymbol({
      symbol,
      exchange,
    });

    return price;
  }
}
