import {
  AssetsRepository,
  SearchAssetParams,
} from '@application/providers/repositories/assets.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type SearchAssetResult = {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
};

export type SearchAssetInterface = UseCase<
  [SearchAssetParams],
  SearchAssetResult[]
>;

export class SearchAsset implements SearchAssetInterface {
  constructor(private assetsRepository: AssetsRepository) {}

  async execute({ search }: SearchAssetParams): Promise<SearchAssetResult[]> {
    const assets = await this.assetsRepository.search({ search });

    return assets.map((asset) => ({
      id: asset.id,
      name: asset.name,
      symbol: asset.symbol,
      exchange: asset.exchange,
    }));
  }
}
