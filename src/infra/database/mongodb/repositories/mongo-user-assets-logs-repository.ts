import { Model, Types } from 'mongoose';

import { FindWithAuth } from '@application/protocols/repository.protocols';
import { UserAssetsLogsRepository } from '@application/providers/repositories/user-assets-logs.repository';
import { UserAssetsLog } from '@domain/entities/user-assets-log';
import {
  UserAssetsLogDocument,
  UserAssetsLogModel,
} from '../schemas/user-assets-log.schema';
import { MongoHelper } from '../mongo-helper';

export class MongoUserAssetsLogsRepository implements UserAssetsLogsRepository {
  userAssetsLogModel: Model<UserAssetsLogDocument> = UserAssetsLogModel;

  async find({ userId }: FindWithAuth): Promise<UserAssetsLog[]> {
    const userAssetsLogs = await this.userAssetsLogModel
      .find({ userId: MongoHelper.objectId(userId) })
      .sort({ date: 1 });

    return userAssetsLogs.map((log) =>
      MongoHelper.mapToClass<UserAssetsLog>(log, UserAssetsLog.prototype),
    );
  }

  async findLastLog({ userId }: FindWithAuth): Promise<UserAssetsLog> {
    const lastLog = await this.userAssetsLogModel
      .findOne({
        userId: MongoHelper.objectId(userId),
      })
      .sort({ date: -1 })
      .limit(1);

    return MongoHelper.mapToClass<UserAssetsLog>(
      lastLog,
      UserAssetsLog.prototype,
    );
  }

  async generateId(): Promise<string> {
    const id = new Types.ObjectId();

    return id.toString();
  }

  async add(userAssetsLog: UserAssetsLog): Promise<void> {
    await this.userAssetsLogModel.create(
      MongoHelper.mapToDocument<UserAssetsLogDocument>(userAssetsLog),
    );
  }
}
