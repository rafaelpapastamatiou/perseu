import mongoose from 'mongoose';
import { UserAssetsLog } from '@domain/entities/user-assets-log';

export type UserAssetsProfitabilityLogDocument = UserAssetsLog &
  mongoose.Document;

export const UserAssetsProfitabilityLogSchema = new mongoose.Schema({
  date: Date,
  percentage: Number,
  userId: mongoose.Schema.Types.ObjectId,
});

export const UserAssetsProfitabilityLogModel = mongoose.model(
  'UserAssetsProfitabilityLog',
  UserAssetsProfitabilityLogSchema,
  'userAssetsProfitabilityLogs',
);
