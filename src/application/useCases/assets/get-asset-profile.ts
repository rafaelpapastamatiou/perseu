import { UseCase } from '@domain/interfaces/use-case';
import {
  AssetsProvider,
  GetAssetProfileResult,
} from '@application/providers/assets';

export type GetAssetProfileParams = {
  symbol: string;
  exchange: string;
};

export type GetAssetProfileInterface = UseCase<
  [GetAssetProfileParams],
  GetAssetProfileResult
>;

export class GetAssetProfile implements GetAssetProfileInterface {
  constructor(private assetsProvider: AssetsProvider) {}

  async execute({
    symbol,
    exchange,
  }: GetAssetProfileParams): Promise<GetAssetProfileResult> {
    const profile = await this.assetsProvider.getProfile({ symbol, exchange });

    return profile;
  }
}
