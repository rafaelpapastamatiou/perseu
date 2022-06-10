import { AssetsProvider } from '@application/providers/assets';
import { UseCase } from '@domain/interfaces/use-case';

export type GetAssetPriceParams = {
  symbol: string;
  exchange: string;
};

export type GetAssetPriceInterface = UseCase<[GetAssetPriceParams], number>;

export class GetAssetPrice implements GetAssetPriceInterface {
  constructor(private assetsProvider: AssetsProvider) {}

  async execute({ symbol, exchange }: GetAssetPriceParams): Promise<number> {
    const price = await this.assetsProvider.getPriceBySymbol({
      symbol,
      exchange,
    });

    return price;
  }
}
