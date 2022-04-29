import mongoose from 'mongoose';

import { Asset } from '@domain/entities/asset';

export type AssetDocument = Asset & mongoose.Document;

export const AssetSchema = new mongoose.Schema({
  symbol: String,
  type: String,
  quantity: Number,
  exchange: String,
  userId: mongoose.Schema.Types.ObjectId,
});

export const AssetModel = mongoose.model('Asset', AssetSchema);
