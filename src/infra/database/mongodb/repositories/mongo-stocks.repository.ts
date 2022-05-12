import { Model, Types } from 'mongoose';

import { MongoHelper } from '../mongo-helper';
import { Cache } from '@application/providers/cache';
import {
  FindStockBySymbol,
  StocksRepository,
} from '@application/providers/repositories/stocks.repository';
import { StockDocument, StockModel } from '../schemas/stock.schema';
import { Stock } from '@domain/entities/stock';

export class MongoStocksRepository implements StocksRepository {
  stockModel: Model<StockDocument> = StockModel;

  constructor(private cache: Cache) {}

  async find(): Promise<Stock[]> {
    const cacheKey = 'stocks';

    const cachedStocks = await this.cache.get<Stock[]>(cacheKey);

    if (cachedStocks && cachedStocks.length > 0) return cachedStocks;

    const stocks = await this.stockModel.find().sort({ name: 1 });

    const mappedStocks = stocks.map((stock) =>
      MongoHelper.mapToClass<Stock>(stock, Stock.prototype),
    );

    await this.cache.set(cacheKey, mappedStocks);

    return mappedStocks;
  }

  async findBySymbol({
    symbol,
    exchange,
  }: FindStockBySymbol): Promise<Stock | undefined> {
    const stock = await this.stockModel.findOne({
      symbol,
      exchange,
    });

    if (!stock) return undefined;

    return MongoHelper.mapToClass<Stock>(stock, Stock.prototype);
  }

  async import(stocks: Stock[]): Promise<void> {
    await this.stockModel.deleteMany();

    const stocksModels = stocks.map((stock) =>
      MongoHelper.mapToDocument<StockDocument>(stock),
    );

    await this.stockModel.bulkWrite(
      stocksModels.map((document) => ({
        insertOne: {
          document,
        },
      })),
    );
  }

  async generateId(): Promise<string> {
    const id = new Types.ObjectId();

    return id.toString();
  }
}
