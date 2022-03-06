import { Entity } from './entity';

export class CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class User extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  private constructor(id: string, data: CreateUserPayload) {
    super(id);

    Object.assign(this, data);
  }

  static create(id: string, data: CreateUserPayload) {
    const user = new User(id, data);

    return user;
  }
}
