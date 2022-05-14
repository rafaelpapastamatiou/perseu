import { Model, Types } from 'mongoose';

import {
  UsersAssetsRepository,
  FindUserAssetBySymbol,
} from '@application/providers/repositories/users-assets.repository';
import { UserAsset } from '@domain/entities/user-asset';
import {
  UserAssetDocument,
  UserAssetModel,
} from '../schemas/user-asset.schema';
import { MongoHelper } from '../mongo-helper';
import { FindByIdWithAuth } from '@application/providers/repositories/repository.protocols';

export class MongoUsersAssetsRepository implements UsersAssetsRepository {
  userAssetModel: Model<UserAssetDocument> = UserAssetModel;

  async findById({
    id,
    userId,
  }: FindByIdWithAuth): Promise<UserAsset | undefined> {
    const userAsset = await this.userAssetModel.findOne({
      _id: MongoHelper.objectId(id),
      userId: MongoHelper.objectId(userId),
    });

    if (!userAsset) return undefined;

    return MongoHelper.mapToClass<UserAsset>(userAsset, UserAsset.prototype);
  }

  async findBySymbol({
    symbol,
    userId,
  }: FindUserAssetBySymbol): Promise<UserAsset | undefined> {
    const userAsset = await this.userAssetModel.findOne({
      symbol,
      userId: MongoHelper.objectId(userId),
    });

    if (!userAsset) return undefined;

    return MongoHelper.mapToClass<UserAsset>(userAsset, UserAsset.prototype);
  }

  async add(userAsset: UserAsset): Promise<void> {
    await this.userAssetModel.create(
      MongoHelper.mapToDocument<UserAssetDocument>(userAsset),
    );
  }

  async update({ id, userId, ...userAsset }: UserAsset): Promise<void> {
    await this.userAssetModel.findOneAndUpdate(
      { _id: MongoHelper.objectId(id), userId: MongoHelper.objectId(userId) },
      userAsset,
    );
  }

  async generateId(): Promise<string> {
    const id = new Types.ObjectId();

    return id.toString();
  }
}
