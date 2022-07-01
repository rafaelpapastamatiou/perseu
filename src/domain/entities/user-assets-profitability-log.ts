import { Entity } from './entity';

export type CreateUserAssetsProfitabilityLogPayload = {
  date: Date;
  percentage: number;
  userId: string;
};

export class UserAssetsProfitabilityLog extends Entity {
  date: Date;
  percentage: number;
  userId: string;

  constructor(id: string, payload: CreateUserAssetsProfitabilityLogPayload) {
    super(id);
    Object.assign(this, payload);
  }

  public static create(
    id: string,
    payload: CreateUserAssetsProfitabilityLogPayload,
  ) {
    const userAssetsProfitabilityLog = new UserAssetsProfitabilityLog(
      id,
      payload,
    );

    return userAssetsProfitabilityLog;
  }
}
