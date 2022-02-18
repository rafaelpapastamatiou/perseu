import { Model, Types } from 'mongoose';

import { UsersRepository } from '@application/providers/repositories/users.repository';
import { User } from '@domain/entities/user';
import { MongoHelper } from '@infra/providers/database/mongodb/mongo-helper';
import { UserDocument, UserModel } from '../schemas/user.schema';

export class MongoUsersRepository implements UsersRepository {
  userModel: Model<UserDocument> = UserModel;

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne(new Types.ObjectId(id));

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return MongoHelper.mapToClass<User>(user);
  }

  async findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findByUsername(username: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async add(user: User): Promise<User> {
    const userDocument = await this.userModel.create(
      MongoHelper.mapToDocument<UserDocument>(user),
    );

    if (!userDocument) throw new Error('Erro ao salvar usuário.');

    return MongoHelper.mapToClass<User>(userDocument);
  }

  async generateId(): Promise<string> {
    return new Types.ObjectId().toString();
  }
}
