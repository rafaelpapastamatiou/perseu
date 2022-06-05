import mongoose from 'mongoose';

import { AssetType } from '@domain/entities/asset-type';

export type AssetTypeDocument = AssetType & mongoose.Document;

export const AssetTypeSchema = new mongoose.Schema({
  name: String,
});

export const AssetTypeModel = mongoose.model(
  'AssetType',
  AssetTypeSchema,
  'assetTypes',
);
