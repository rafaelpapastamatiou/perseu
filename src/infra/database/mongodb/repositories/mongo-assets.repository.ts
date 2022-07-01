import { Model, Types } from 'mongoose';

import { MongoHelper } from '../mongo-helper';
import { Cache } from '@application/providers/cache';
import {
  FindAssetBySymbol,
  AssetsRepository,
  SearchAssetParams,
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
    const [stock] = await this.assetModel.aggregate([
      { $match: { symbol, exchange } },
      {
        $lookup: {
          from: 'assetTypes',
          as: 'type',
          foreignField: '_id',
          localField: 'typeId',
        },
      },
      {
        $unwind: '$type',
      },
    ]);

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

  async search({ search }: SearchAssetParams): Promise<Asset[]> {
    const cacheKey = `assets-search-${search}`;

    const cachedSearchedAssets = await this.cache.get<Asset[]>(cacheKey);

    if (cachedSearchedAssets && cachedSearchedAssets.length > 0)
      return cachedSearchedAssets;

    const searchedAssets = await this.assetModel.aggregate([
      {
        $match: {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        },
      },
    ]);

    await this.cache.set(cacheKey, searchedAssets);

    return searchedAssets.map((asset) =>
      MongoHelper.mapToClass<Asset>(asset, Asset.prototype),
    );
  }
}
