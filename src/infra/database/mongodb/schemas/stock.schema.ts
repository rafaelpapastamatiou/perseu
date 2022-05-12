import mongoose from 'mongoose';

import { Stock } from '@domain/entities/stock';

export type StockDocument = Stock & mongoose.Document;

export const StockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  currency: String,
  exchange: String,
  micCode: String,
  country: String,
  type: String,
});

export const StockModel = mongoose.model('Stock', StockSchema);
