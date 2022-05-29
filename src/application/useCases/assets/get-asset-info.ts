import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type GetAssetInfoResult = {
  symbol: string;
  exchange: string;
  name: string;
  currency: string;
};

export type GetAssetInfoParams = {
  symbol: string;
  exchange: string;
};

export type GetAssetInfoInterface = UseCase<
  [GetAssetInfoParams],
  GetAssetInfoResult
>;

export class GetAssetInfo implements GetAssetInfoInterface {
  constructor(private assetsRepository: AssetsRepository) {}

  async execute({
    symbol,
    exchange,
  }: GetAssetInfoParams): Promise<GetAssetInfoResult> {
    const asset = await this.assetsRepository.findBySymbol({
      symbol,
      exchange,
    });

    return asset;
  }
}
