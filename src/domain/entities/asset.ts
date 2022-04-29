import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { Entity } from './entity';

export type CreateAssetPayload = {
  symbol: string;
  type: string;
  quantity: number;
  exchange: string;
  userId: string;
};

export type UpdateAssetPayload = {
  quantity: number;
};

export class Asset extends Entity {
  symbol: string;
  type: string;
  quantity: number;
  exchange: string;
  userId: string;

  private constructor(id: string, data: CreateAssetPayload) {
    super(id);

    Object.assign(this, data);
  }

  static create(id: string, data: CreateAssetPayload) {
    const userAsset = new Asset(id, data);

    return userAsset;
  }

  update(payload: UpdateAssetPayload) {
    const { quantity } = payload;

    if (quantity < 0) {
      throw new InvalidParamException(
        'Asset quantity must be greater than or equal to zero.',
      );
    }

    Object.assign(this, payload);
  }
}
