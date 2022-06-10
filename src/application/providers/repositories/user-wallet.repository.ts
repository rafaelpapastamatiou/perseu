import { FindWithAuth } from '../../protocols/repository.protocols';

export interface UserWalletRepository {
  getComposition(
    identifier: FindWithAuth,
  ): Promise<GetUserWalletCompositionItem[]>;
  getCompositionByAssetType(
    identifier: FindWithAuth,
  ): Promise<GetUserWalletCompositionByAssetTypeItem[]>;
}

export type GetUserWalletCompositionItem = {
  symbol: string;
  type: string;
  percentage: number;
};

export type GetUserWalletCompositionByAssetTypeItem = {
  type: string;
  percentage: number;
};
