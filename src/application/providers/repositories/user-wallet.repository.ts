import { FindWithAuth } from '../../protocols/repository.protocols';

export interface UserWalletRepository {
  getComposition(
    identifier: FindWithAuth,
  ): Promise<GetUserWalletCompositionResult>;
}

export type GetUserWalletCompositionResult = {
  symbol: string;
  percentage: number;
}[];
