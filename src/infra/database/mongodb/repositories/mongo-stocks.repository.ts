import { Model, Types } from 'mongoose';

import { MongoHelper } from '../mongo-helper';
import { Cache } from '@application/providers/cache';
import {
  FindAssetBySymbol,
  AssetsRepository,
} from '@application/providers/repositories/assets.repository';
import { AssetDocument, AssetModel } from '../schemas/asset.schema';
import { Asset } from '@domain/entities/asset';

export class MongoAssetsRepository implements AssetsRepository {
  assetModel: Model<AssetDocument> = AssetModel;

  constructor(private cache: Cache) {}

  async find(): Promise<Asset[]> {
    const cacheKey = 'assets';

    const cachedAssets = await this.cache.get<Asset[]>(cacheKey);

    if (cachedAssets && cachedAssets.length > 0) return cachedAssets;

    const assets = await this.assetModel.find().sort({ name: 1 });

    const mappedStocks = assets.map((asset) =>
      MongoHelper.mapToClass<Asset>(asset, Asset.prototype),
    );

    await this.cache.set(cacheKey, mappedStocks);

    return mappedStocks;
  }

  async findBySymbol({
    symbol,
    exchange,
  }: FindAssetBySymbol): Promise<Asset | undefined> {
    const stock = await this.assetModel.findOne({
      symbol,
      exchange,
    });

    if (!stock) return undefined;

    return MongoHelper.mapToClass<Asset>(stock, Asset.prototype);
  }

  async import(stocks: Asset[]): Promise<void> {
    await this.assetModel.deleteMany();

    const stocksModels = stocks.map((stock) =>
      MongoHelper.mapToDocument<AssetDocument>(stock),
    );

    await this.assetModel.bulkWrite(
      stocksModels.map((document) => ({
        insertOne: {
          document,
        },
      })),
    );
  }

  async generateId(): Promise<string> {
    const id = new Types.ObjectId();

    return id.toString();
  }
}
