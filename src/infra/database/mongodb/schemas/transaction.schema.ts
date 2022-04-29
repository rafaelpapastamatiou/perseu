import mongoose from 'mongoose';

import { Transaction } from '@domain/entities/transaction';

export type TransactionDocument = Transaction & mongoose.Document;

export const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['purchase', 'sale'], default: 'purchase' },
  symbol: String,
  exchange: String,
  quantity: Number,
  unitValue: Number,
  date: Date,
  userId: mongoose.Schema.Types.ObjectId,
});

export const TransactionModel = mongoose.model(
  'Transaction',
  TransactionSchema,
);
