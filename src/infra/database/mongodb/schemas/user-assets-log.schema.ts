import mongoose from 'mongoose';
import { UserAssetsLog } from '@domain/entities/user-assets-log';

export type UserAssetsLogDocument = UserAssetsLog & mongoose.Document;

export const UserAssetsLogSchema = new mongoose.Schema({
  date: Date,
  total: Number,
  userId: mongoose.Schema.Types.ObjectId,
});

export const UserAssetsLogModel = mongoose.model(
  'UserAssetsLog',
  UserAssetsLogSchema,
  'userAssetsLogs',
);
