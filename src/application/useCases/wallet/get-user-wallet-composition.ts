import { FindWithAuth } from '@application/providers/repositories/repository.protocols';
import {
  GetUserWalletCompositionResult,
  UserWalletRepository,
} from '@application/providers/repositories/user-wallet.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type GetUserWalletCompositionInterface = UseCase<
  [FindWithAuth],
  GetUserWalletCompositionResult
>;

export class GetUserWalletComposition
  implements GetUserWalletCompositionInterface {
  constructor(private userWalletRepository: UserWalletRepository) {}

  async execute({
    userId,
  }: FindWithAuth): Promise<GetUserWalletCompositionResult> {
    const userWalletComposition =
      await this.userWalletRepository.getComposition({
        userId,
      });

    return userWalletComposition;
  }
}
