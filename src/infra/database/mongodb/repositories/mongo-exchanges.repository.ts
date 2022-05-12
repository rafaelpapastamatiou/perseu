import { Model, Types } from 'mongoose';

import { ExchangesRepository } from '@application/providers/repositories/exchanges.repository';
import { Exchange } from '@domain/entities/exchange';
import { ExchangeDocument, ExchangeModel } from '../schemas/exchange.schema';
import { MongoHelper } from '../mongo-helper';
import { Cache } from '@application/providers/cache';

export class MongoExchangesRepository implements ExchangesRepository {
  exchangeModel: Model<ExchangeDocument> = ExchangeModel;

  constructor(private cache: Cache) {}

  async find(): Promise<Exchange[]> {
    const cacheKey = 'exchanges';

    const cachedExchanges = await this.cache.get<Exchange[]>(cacheKey);

    if (cachedExchanges && cachedExchanges.length > 0) return cachedExchanges;

    const exchanges = await this.exchangeModel.find().sort({ name: 1 });

    const mappedExchanges = exchanges.map((exchange) =>
      MongoHelper.mapToClass<Exchange>(exchange, Exchange.prototype),
    );

    await this.cache.set(cacheKey, mappedExchanges);

    return mappedExchanges;
  }

  async findByCode(code: string): Promise<Exchange | undefined> {
    const cacheKey = `exchanges-${code}`;

    const cachedExchange = await this.cache.get<Exchange | undefined>(cacheKey);

    if (cachedExchange) return cachedExchange;

    const exchange = await this.exchangeModel.findOne({ code });

    if (!exchange) return undefined;

    const mappedExchange = MongoHelper.mapToClass<Exchange>(
      exchange,
      Exchange.prototype,
    );

    await this.cache.set(cacheKey, mappedExchange);

    return mappedExchange;
  }

  async save(exchange: Exchange): Promise<void> {
    const { id, ...exchangeData } = exchange;
    const exchangeId = MongoHelper.objectId(id);

    await this.exchangeModel.findOneAndUpdate(
      {
        _id: exchangeId,
      },
      exchangeData,
      { upsert: true },
    );
  }

  async import(exchanges: Exchange[]): Promise<void> {
    await this.exchangeModel.deleteMany();

    const exchangeDocuments = exchanges.map((exchange) =>
      MongoHelper.mapToDocument<ExchangeDocument>(exchange),
    );

    await this.exchangeModel.bulkWrite(
      exchangeDocuments.map((document) => ({
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
