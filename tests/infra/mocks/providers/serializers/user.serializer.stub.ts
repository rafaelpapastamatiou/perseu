import lodash from 'lodash';

import { Serializer } from '@application/providers/serializer';
import { User } from '@domain/entities/user';

export class UserSerializerStub implements Serializer {
  serialize(user: User): Omit<User, 'password'> {
    const serializedUser = lodash.cloneDeep(user);

    delete serializedUser.password;

    return serializedUser;
  }
}
