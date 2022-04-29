import { Model, Types } from 'mongoose';

import {
  AssetsRepository,
  FindAssetBySymbol,
} from '@application/providers/repositories/assets.repository';
import { Asset } from '@domain/entities/asset';
import { AssetDocument, AssetModel } from '../schemas/asset.schema';
import { MongoHelper } from '../mongo-helper';
import { FindByIdWithAuth } from '@application/providers/repositories/repository.protocols';

export class MongoAssetsRepository implements AssetsRepository {
  assetModel: Model<AssetDocument> = AssetModel;

  async findById({ id, userId }: FindByIdWithAuth): Promise<Asset | undefined> {
    const asset = await this.assetModel.findOne({
      _id: MongoHelper.objectId(id),
      userId: MongoHelper.objectId(userId),
    });

    if (!asset) return undefined;

    return MongoHelper.mapToClass<Asset>(asset, Asset.prototype);
  }

  async findBySymbol({
    symbol,
    userId,
  }: FindAssetBySymbol): Promise<Asset | undefined> {
    const asset = await this.assetModel.findOne({
      symbol,
      userId: MongoHelper.objectId(userId),
    });

    if (!asset) return undefined;

    return MongoHelper.mapToClass<Asset>(asset, Asset.prototype);
  }

  async add(asset: Asset): Promise<void> {
    await this.assetModel.create(
      MongoHelper.mapToDocument<AssetDocument>(asset),
    );
  }

  async update({ id, userId, ...asset }: Asset): Promise<void> {
    await this.assetModel.findOneAndUpdate(
      { _id: MongoHelper.objectId(id), userId: MongoHelper.objectId(userId) },
      asset,
    );
  }

  async generateId(): Promise<string> {
    const id = new Types.ObjectId();

    return id.toString();
  }
}
