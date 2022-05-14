import mongoose from 'mongoose';

import { UserAsset } from '@domain/entities/user-asset';

export type UserAssetDocument = UserAsset & mongoose.Document;

export const UserAssetSchema = new mongoose.Schema({
  symbol: String,
  type: String,
  quantity: Number,
  exchange: String,
  userId: mongoose.Schema.Types.ObjectId,
});

export const UserAssetModel = mongoose.model('UserAsset', UserAssetSchema);
