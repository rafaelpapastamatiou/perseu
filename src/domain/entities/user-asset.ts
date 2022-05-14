import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { Entity } from './entity';

export type CreateUserAssetPayload = {
  symbol: string;
  type: string;
  quantity: number;
  exchange: string;
  userId: string;
};

export type UpdateUserAssetPayload = {
  quantity: number;
};

export class UserAsset extends Entity {
  symbol: string;
  type: string;
  quantity: number;
  exchange: string;
  userId: string;

  private constructor(id: string, data: CreateUserAssetPayload) {
    super(id);

    Object.assign(this, data);
  }

  static create(id: string, data: CreateUserAssetPayload) {
    const userAsset = new UserAsset(id, data);

    return userAsset;
  }

  update(payload: UpdateUserAssetPayload) {
    const { quantity } = payload;

    if (quantity < 0) {
      throw new InvalidParamException(
        'Asset quantity must be greater than or equal to zero.',
      );
    }

    Object.assign(this, payload);
  }
}
