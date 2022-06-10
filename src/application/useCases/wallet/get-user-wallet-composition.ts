import { FindWithAuth } from '@application/protocols/repository.protocols';
import {
  GetUserWalletCompositionItem,
  UserWalletRepository,
} from '@application/providers/repositories/user-wallet.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type GetUserWalletCompositionInterface = UseCase<
  [FindWithAuth],
  GetUserWalletCompositionItem[]
>;

export class GetUserWalletComposition
  implements GetUserWalletCompositionInterface {
  constructor(private userWalletRepository: UserWalletRepository) {}

  async execute({
    userId,
  }: FindWithAuth): Promise<GetUserWalletCompositionItem[]> {
    const userWalletComposition =
      await this.userWalletRepository.getComposition({
        userId,
      });

    return userWalletComposition;
  }
}
