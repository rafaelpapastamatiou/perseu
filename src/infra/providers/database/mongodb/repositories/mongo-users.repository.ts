import { Model, Types } from 'mongoose';

import { UsersRepository } from '@application/providers/repositories/users.repository';
import { User } from '@domain/entities/user';
import { MongoHelper } from '@infra/providers/database/mongodb/mongo-helper';
import { UserDocument, UserModel } from '../schemas/user.schema';

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

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({
      username,
    });

    return MongoHelper.mapToClass<User>(user);
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    const user = await this.userModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
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
