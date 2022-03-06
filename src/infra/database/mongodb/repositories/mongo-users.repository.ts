import { Model, Types } from 'mongoose';

import { UsersRepository } from '@application/providers/repositories/users.repository';
import { User } from '@domain/entities/user';
import { UserDocument, UserModel } from '../schemas/user.schema';
import { MongoHelper } from '../mongo-helper';

export class MongoUsersRepository implements UsersRepository {
  userModel: Model<UserDocument> = UserModel;

  async findById(id: string): Promise<User | undefined> {
    const user = await this.userModel.findOne(MongoHelper.objectId(id));

    if (!user) return undefined;

    return MongoHelper.mapToClass<User>(user, User.prototype);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) return undefined;

    return MongoHelper.mapToClass<User>(user, User.prototype);
  }

  async add(user: User): Promise<void> {
    await this.userModel.create(MongoHelper.mapToDocument<UserDocument>(user));
  }

  async generateId(): Promise<string> {
    const id = new Types.ObjectId();

    return id.toString();
  }
}
