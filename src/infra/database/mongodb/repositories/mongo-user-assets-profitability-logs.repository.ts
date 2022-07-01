import { Model, Types } from 'mongoose';

import { FindWithAuth } from '@application/protocols/repository.protocols';
import { UserAssetsProfitabilityLogsRepository } from '@application/providers/repositories/user-assets-profitability-logs.repository';
import { UserAssetsProfitabilityLog } from '@domain/entities/user-assets-profitability-log';
import {
  UserAssetsProfitabilityLogDocument,
  UserAssetsProfitabilityLogModel,
} from '../schemas/user-assets-profitability-log.schema';
import { MongoHelper } from '../mongo-helper';

export class MongoUserAssetsProfitabilityLogsRepository
  implements UserAssetsProfitabilityLogsRepository {
  userAssetsProfitabilityLogModel: Model<UserAssetsProfitabilityLogDocument> =
    UserAssetsProfitabilityLogModel;

  async find({ userId }: FindWithAuth): Promise<UserAssetsProfitabilityLog[]> {
    const logs = await this.userAssetsProfitabilityLogModel
      .find({
        userId: MongoHelper.objectId(userId),
      })
      .sort({ date: 1 });

    return logs.map((log) =>
      MongoHelper.mapToClass<UserAssetsProfitabilityLog>(
        log,
        UserAssetsProfitabilityLog.prototype,
      ),
    );
  }

  async generateId(): Promise<string> {
    const id = new Types.ObjectId();

    return id.toString();
  }

  async add(log: UserAssetsProfitabilityLog): Promise<void> {
    await this.userAssetsProfitabilityLogModel.create(
      MongoHelper.mapToDocument<UserAssetsProfitabilityLogDocument>(log),
    );
  }
}
