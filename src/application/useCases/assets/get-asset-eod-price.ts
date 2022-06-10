import { AssetsProvider } from '@application/providers/assets';
import { UseCase } from '@domain/interfaces/use-case';

export type GetAssetEodPriceParams = {
  symbol: string;
  exchange: string;
};

export type GetAssetEodPriceInterface = UseCase<
  [GetAssetEodPriceParams],
  number
>;

export class GetAssetEodPrice implements GetAssetEodPriceInterface {
  constructor(private assetsProvider: AssetsProvider) {}

  async execute({ symbol, exchange }: GetAssetEodPriceParams): Promise<number> {
    const eodPrice = await this.assetsProvider.getEodPriceBySymbol({
      symbol,
      exchange,
    });

    return eodPrice;
  }
}
