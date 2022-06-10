import { FindWithAuth } from '@application/protocols/repository.protocols';
import {
  GetUserWalletCompositionByAssetTypeItem,
  UserWalletRepository,
} from '@application/providers/repositories/user-wallet.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type GetUserWalletCompositionByAssetTypeInterface = UseCase<
  [FindWithAuth],
  GetUserWalletCompositionByAssetTypeItem[]
>;

export class GetUserWalletCompositionByAssetType
  implements GetUserWalletCompositionByAssetTypeInterface {
  constructor(private userWalletRepository: UserWalletRepository) {}

  async execute({
    userId,
  }: FindWithAuth): Promise<GetUserWalletCompositionByAssetTypeItem[]> {
    const composition =
      await this.userWalletRepository.getCompositionByAssetType({ userId });

    return composition;
  }
}
