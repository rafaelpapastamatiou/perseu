import axios from 'axios';
import {
  FindStockParams,
  StockResult,
  Stocks,
} from '@application/providers/stocks';
import { TwelvedataStockNotFoundException } from './exceptions/twelvedata-stock-not-found.exception';
import { InternalException } from '@domain/exceptions/internal.exception';
import { Cache } from '@application/providers/cache';

const apiClient = createClient();

type TwelvedataStockInfoData = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
};

type TwelvedataStockInfoResponse = {
  data: TwelvedataStockInfoData[];
};

type TwelvedataStockPriceResponse = {
  price: number;
};

export class TwelvedataStocks implements Stocks {
  private client = apiClient;

  constructor(private cache: Cache) {}

  async findBySymbol({
    symbol,
    exchange,
  }: FindStockParams): Promise<StockResult> {
    try {
      const cacheKey = `${symbol}-${exchange}`;

      const cachedStock = await this.cache.get<StockResult>(cacheKey);

      if (cachedStock) return cachedStock;

      const {
        data: { data: stocks },
      } = await this.client.get<TwelvedataStockInfoResponse>('stocks', {
        params: {
          symbol,
          exchange,
        },
      });

      if (!stocks || stocks.length === 0) {
        throw new TwelvedataStockNotFoundException(symbol);
      }

      const stockData = stocks[0];

      const stock = {
        exchange: stockData.exchange,
        symbol,
        name: stockData.name,
        currency: stockData.currency,
      };

      await this.cache.set(cacheKey, stock);

      return stock;
    } catch (err) {
      handleTwelvedataProviderError(symbol, err);
    }
  }

  async findPriceBySymbol({
    symbol,
    exchange,
  }: FindStockParams): Promise<number> {
    try {
      const cacheKey = `${symbol}-${exchange}-price`;

      const cachedPrice = await this.cache.get<string>(cacheKey);

      if (cachedPrice) return Number(cachedPrice);

      const { data } = await this.client.get<TwelvedataStockPriceResponse>(
        'price',
        {
          params: {
            symbol,
            exchange,
          },
        },
      );

      await this.cache.set(cacheKey, data.price);

      return data.price;
    } catch (err) {
      handleTwelvedataProviderError(symbol, err);
    }
  }
}

function handleTwelvedataProviderError(symbol, err: any) {
  if (err.response) {
    const responseData = err.response.data;

    if (
      responseData &&
      responseData.code === 400 &&
      responseData.status === 'error' &&
      responseData.message &&
      responseData.message.includes('not found')
    ) {
      throw new TwelvedataStockNotFoundException(symbol);
    }
  }

  throw err;
}

function createClient() {
  if (!process.env.TWELVEDATA_URL) {
    throw new Error('process.env.TWELVEDATA_URL not found');
  }

  if (!process.env.TWELVEDATA_APIKEY) {
    throw new Error('process.env.TWELVEDATA_APIKEY not found');
  }

  const client = axios.create({
    baseURL: process.env.TWELVEDATA_URL,
  });

  client.interceptors.request.use(
    function (config) {
      config.params['apikey'] = process.env.TWELVEDATA_APIKEY;

      return config;
    },
    function (err) {
      return Promise.reject(err);
    },
  );

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      if (err.response && err.response.data) {
        if (err.response.data.code === 401) {
          throw new InternalException();
        }
      }

      return Promise.reject(err);
    },
  );

  return client;
}
