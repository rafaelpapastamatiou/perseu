import { Model } from 'mongoose';

import { FindWithAuth } from '@application/providers/repositories/repository.protocols';
import {
  GetUserWalletCompositionResult,
  UserWalletRepository,
} from '@application/providers/repositories/user-wallet.repository';
import {
  UserAssetDocument,
  UserAssetModel,
} from '../schemas/user-asset.schema';
import { MongoHelper } from '../mongo-helper';
import { UserAsset } from '@domain/entities/user-asset';
import { Stocks } from '@application/providers/stocks';

export class MongoUserWalletRepository implements UserWalletRepository {
  userAssetModel: Model<UserAssetDocument> = UserAssetModel;

  constructor(private stocksProvider: Stocks) {}

  async getComposition({
    userId,
  }: FindWithAuth): Promise<GetUserWalletCompositionResult> {
    const userAssets = (await this.userAssetModel.find({ userId })).map(
      (userAsset) =>
        MongoHelper.mapToClass<UserAsset>(userAsset, UserAsset.prototype),
    );

    const getAssetPricePromises = [];

    for (const userAsset of userAssets) {
      getAssetPricePromises.push(
        this.stocksProvider.findPriceBySymbol({
          symbol: userAsset.symbol,
          exchange: userAsset.exchange,
        }),
      );
    }

    const assetPrices: number[] = await Promise.all(getAssetPricePromises);

    const userAssetsWithPrice = userAssets.map((userAsset, index) => ({
      ...userAsset,
      price: assetPrices[index],
    }));

    const totalValue = userAssetsWithPrice.reduce(
      (acc, next) => acc + next.price * next.quantity,
      0,
    );

    const composition = userAssetsWithPrice.map((userAsset) => ({
      symbol: userAsset.symbol,
      percentage: ((userAsset.price * userAsset.quantity) / totalValue) * 100,
    }));

    return composition;
  }
}
