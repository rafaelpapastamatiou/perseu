import { Model } from 'mongoose';

import { MongoHelper } from '../mongo-helper';
import { AssetTypesRepository } from '@application/providers/repositories/asset-types.repository';
import {
  AssetTypeDocument,
  AssetTypeModel,
} from '../schemas/asset-type.schema';
import { AssetType } from '@domain/entities/asset-type';

export class MongoAssetTypesRepository implements AssetTypesRepository {
  assetTypeModel: Model<AssetTypeDocument> = AssetTypeModel;

  async find(): Promise<AssetType[]> {
    const assetTypes = await this.assetTypeModel.find().sort({ name: 1 });

    const mappedAssetTypes = assetTypes.map((assetType) =>
      MongoHelper.mapToClass<AssetType>(assetType, AssetType.prototype),
    );

    return mappedAssetTypes;
  }
}
