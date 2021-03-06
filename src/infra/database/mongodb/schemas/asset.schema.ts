import mongoose from 'mongoose';

import { Asset } from '@domain/entities/asset';

export type AssetDocument = Asset & mongoose.Document;

export const AssetSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  currency: String,
  exchange: String,
  micCode: String,
  country: String,
  typeId: mongoose.Types.ObjectId,
});

AssetSchema.index({ symbol: 'text', exchange: 'text', name: 'text' });

export const AssetModel = mongoose.model('Asset', AssetSchema);
