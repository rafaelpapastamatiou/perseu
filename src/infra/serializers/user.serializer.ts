import { Serializer } from '@application/providers/serializer';
import { User } from '@domain/entities/user';
import {
  Exclude,
  plainToInstance,
  instanceToInstance,
  Expose,
} from 'class-transformer';

@Expose()
class SerializedUser {
  @Exclude()
  password: string;
}

export class UserSerializer implements Serializer {
  serialize(data: User): SerializedUser {
    const user = plainToInstance(SerializedUser, data);

    const serializedUser = instanceToInstance(user);

    return serializedUser;
  }
}
