import { Model, Types } from 'mongoose';

import { UsersRepository } from '@application/providers/repositories/users.repository';
import { User } from '@domain/entities/user';
import { UserDocument, UserModel } from '../schemas/user.schema';
import { MongoHelper } from '../mongo-helper';

export class MongoUsersRepository implements UsersRepository {
  userModel: Model<UserDocument> = UserModel;

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne(new Types.ObjectId(id));

    return MongoHelper.mapToClass<User>(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      email,
    });

    return MongoHelper.mapToClass<User>(user);
  }

  async add(user: User): Promise<User> {
    const userDocument = await this.userModel.create(
      MongoHelper.mapToDocument<UserDocument>(user),
    );

    return MongoHelper.mapToClass<User>(userDocument);
  }

  async generateId(): Promise<string> {
    const id = new Types.ObjectId();

    return id.toString();
  }
}
