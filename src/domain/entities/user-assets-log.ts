import { Entity } from './entity';

export type CreateUserAssetsLogPayload = {
  date: Date;
  total: number;
  userId: string;
};

export class UserAssetsLog extends Entity {
  date: Date;
  total: number;
  userId: string;

  constructor(id: string, payload: CreateUserAssetsLogPayload) {
    super(id);
    Object.assign(this, payload);
  }

  public static create(id: string, payload: CreateUserAssetsLogPayload) {
    const userAssetsLog = new UserAssetsLog(id, payload);

    return userAssetsLog;
  }
}
