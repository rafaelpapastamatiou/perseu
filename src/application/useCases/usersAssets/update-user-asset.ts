import { UsersAssetsRepository } from '@application/providers/repositories/users-assets.repository';
import { UpdateUserAssetPayload, UserAsset } from '@domain/entities/user-asset';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { NotFoundException } from '@domain/exceptions/not-found.exception';
import { UseCase } from '@domain/interfaces/use-case';

export type UpdateUserAssetIdentifier = {
  userId: string;
  id: string;
};

export type UpdateUserAssetInterface = UseCase<
  [UpdateUserAssetIdentifier, UpdateUserAssetPayload],
  UserAsset
>;

export class UpdateUserAsset implements UpdateUserAssetInterface {
  constructor(private usersAssetsRepository: UsersAssetsRepository) {}

  async execute(
    { id, userId }: UpdateUserAssetIdentifier,
    payload: UpdateUserAssetPayload,
  ): Promise<UserAsset> {
    if (payload.quantity <= 0) {
      throw new InvalidParamException(
        'User asset quantity must be greater than zero.',
      );
    }

    const userAsset = await this.usersAssetsRepository.findById({
      id,
      userId,
    });

    if (!userAsset) {
      throw new NotFoundException('User asset not found.');
    }

    userAsset.update(payload);

    await this.usersAssetsRepository.update(userAsset);

    return userAsset;
  }
}
