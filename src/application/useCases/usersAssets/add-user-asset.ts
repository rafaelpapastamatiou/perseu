import { UserAssetsRepository } from '@application/providers/repositories/user-assets.repository';
import { CreateUserAssetPayload, UserAsset } from '@domain/entities/user-asset';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { UseCase } from '@domain/interfaces/use-case';

export type AddUserAssetInterface = UseCase<
  [CreateUserAssetPayload],
  UserAsset
>;

export class AddUserAsset implements AddUserAssetInterface {
  constructor(private assetsRepository: UserAssetsRepository) {}

  async execute(payload: CreateUserAssetPayload): Promise<UserAsset> {
    if (payload.quantity <= 0) {
      throw new InvalidParamException(
        'User asset quantity must be greater than zero.',
      );
    }

    const id = await this.assetsRepository.generateId();

    if (!id) {
      throw new Error('Error generating id for userAsset.');
    }

    const userAsset = UserAsset.create(id, payload);

    await this.assetsRepository.add(userAsset);

    return userAsset;
  }
}
