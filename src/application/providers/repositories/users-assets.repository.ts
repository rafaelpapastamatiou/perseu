import { UserAsset } from '@domain/entities/user-asset';
import { FindByIdWithAuth, FindWithAuth } from './repository.protocols';

export interface UsersAssetsRepository {
  findById(params: FindByIdWithAuth): Promise<UserAsset | undefined>;
  findBySymbol(
    identifier: FindUserAssetBySymbol,
  ): Promise<UserAsset | undefined>;
  add(userAsset: UserAsset): Promise<void>;
  update(userAsset: UserAsset): Promise<void>;
  generateId(): Promise<string>;
}

export type FindUserAssetBySymbol = FindWithAuth & {
  symbol: string;
};
