import mongoose from 'mongoose';

import { Exchange } from '@domain/entities/exchange';

export type ExchangeDocument = Exchange & mongoose.Document;

export const ExchangeSchema = new mongoose.Schema({
  name: String,
  code: String,
  country: String,
  timezone: String,
});

export const ExchangeModel = mongoose.model('Exchange', ExchangeSchema);
