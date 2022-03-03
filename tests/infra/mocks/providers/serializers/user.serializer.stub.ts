import { Serializer } from '@application/providers/serializer';
import { User } from '@domain/entities/user';

export class UserSerializerStub implements Serializer {
  serialize(data: User): Omit<User, 'password'> {
    const { password, ...user } = data;

    return user;
  }
}
