import {
  PaginationConfig,
  PaginationResult,
} from '@application/protocols/pagination.protocols';
import { UserAsset } from '@domain/entities/user-asset';
import {
  FindByIdWithAuth,
  FindWithAuth,
} from '../../protocols/repository.protocols';

export interface UserAssetsRepository {
  find(
    identifier: FindWithAuth,
    paginationConfig: PaginationConfig,
  ): Promise<PaginationResult<UserAsset>>;

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
