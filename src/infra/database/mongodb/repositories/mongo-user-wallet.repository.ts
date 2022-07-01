import { Model } from 'mongoose';

import { FindWithAuth } from '@application/protocols/repository.protocols';
import {
  GetUserWalletCompositionByAssetTypeItem,
  GetUserWalletCompositionItem,
  UserWalletRepository,
} from '@application/providers/repositories/user-wallet.repository';
import {
  UserAssetDocument,
  UserAssetModel,
} from '../schemas/user-asset.schema';
import { MongoHelper } from '../mongo-helper';
import { UserAsset } from '@domain/entities/user-asset';
import { AssetsProvider } from '@application/providers/assets';

export class MongoUserWalletRepository implements UserWalletRepository {
  userAssetModel: Model<UserAssetDocument> = UserAssetModel;

  constructor(private assetsProvider: AssetsProvider) {}

  async getComposition({
    userId,
  }: FindWithAuth): Promise<GetUserWalletCompositionItem[]> {
    const userAssets = (
      await this.userAssetModel.find({ userId: MongoHelper.objectId(userId) })
    ).map((userAsset) =>
      MongoHelper.mapToClass<UserAsset>(userAsset, UserAsset.prototype),
    );

    const getAssetPricePromises = [];

    for (const userAsset of userAssets) {
      getAssetPricePromises.push(
        this.assetsProvider.getPriceBySymbol({
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
      type: userAsset.type,
      percentage: Number(
        (((userAsset.price * userAsset.quantity) / totalValue) * 100).toFixed(
          1,
        ),
      ),
    }));

    return composition as GetUserWalletCompositionItem[];
  }

  async getCompositionByAssetType({
    userId,
  }: FindWithAuth): Promise<GetUserWalletCompositionByAssetTypeItem[]> {
    const composition = await this.getComposition({ userId });

    const compositionByAssetType = composition
      .reduce((acc, next) => {
        const index = acc.findIndex(({ type }) => type === next.type);

        if (index < 0) {
          const obj = {
            type: next.type,
            percentage: next.percentage,
          };

          acc.push(obj);

          return acc;
        }

        acc[index].percentage += next.percentage;

        return acc;
      }, [])
      .map((assetTypeComposition) => ({
        ...assetTypeComposition,
        percentage: Number(assetTypeComposition.percentage.toFixed(1)),
      }));

    return compositionByAssetType;
  }
}
