import { Model, Types } from 'mongoose';

import {
  UserAssetsRepository,
  FindUserAssetBySymbol,
} from '@application/providers/repositories/user-assets.repository';
import { UserAsset } from '@domain/entities/user-asset';
import {
  UserAssetDocument,
  UserAssetModel,
} from '../schemas/user-asset.schema';
import { MongoHelper } from '../mongo-helper';
import {
  FindByIdWithAuth,
  FindWithAuth,
} from '@application/protocols/repository.protocols';
import {
  PaginationConfig,
  PaginationResult,
} from '@application/protocols/pagination.protocols';

export class MongoUserAssetsRepository implements UserAssetsRepository {
  userAssetModel: Model<UserAssetDocument> = UserAssetModel;

  async find({ userId }: FindWithAuth): Promise<UserAsset[]> {
    const userAssets = await this.userAssetModel.find({
      userId: MongoHelper.objectId(userId),
    });

    return userAssets.map((asset) =>
      MongoHelper.mapToClass<UserAsset>(asset, UserAsset.prototype),
    );
  }

  async findPaginated(
    { userId }: FindWithAuth,
    { page, limit }: PaginationConfig,
  ): Promise<PaginationResult<UserAsset>> {
    const offset = page * limit;

    const [{ data = [], count = [] }] = await this.userAssetModel.aggregate([
      {
        $match: {
          userId: MongoHelper.objectId(userId),
        },
      },
      {
        $facet: {
          data: [{ $skip: offset }, { $limit: limit }],
          count: [{ $count: 'total' }],
        },
      },
    ]);

    const [{ total }] = count.length > 0 ? count : [{ total: 0 }];

    return {
      data: data.map((userAsset: UserAssetDocument) =>
        MongoHelper.mapToClass<UserAsset>(userAsset, UserAsset.prototype),
      ),
      total,
      page,
      limit,
    };
  }

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
