import { Entity } from './entity';

export type CreateExchangePayload = {
  name: string;
  code: string;
  country: string;
  timezone: string;
};

export class Exchange extends Entity {
  name: string;
  code: string;
  country: string;
  timezone: string;

  private constructor(id: string, payload: CreateExchangePayload) {
    super(id);

    Object.assign(this, payload);
  }

  static create(id: string, payload: CreateExchangePayload): Exchange {
    const exchange = new Exchange(id, payload);

    return exchange;
  }
}
