import {
  FetchStockResult,
  FindStockParams,
  StockResult,
  Stocks,
} from '@application/providers/stocks';
import { TwelvedataStockNotFoundException } from './exceptions/twelvedata-stock-not-found.exception';
import { Cache } from '@application/providers/cache';
import { twelveDataClient } from './twelvedata-client';

type TwelvedataStockInfoData = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
};

type TwelvedataStockData = TwelvedataStockInfoData & {
  type: string;
  mic_code: string;
  country: string;
};

type TwelvedataStockInfoResponse = {
  data: TwelvedataStockInfoData[];
};

type TwelvedataStockPriceResponse = {
  price: number;
};

type TwelvedataStocksResponse = {
  data: TwelvedataStockData[];
};

export class TwelvedataStocks implements Stocks {
  private client = twelveDataClient;

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

  async find(): Promise<FetchStockResult[]> {
    const {
      data: { data: stocks },
    } = await this.client.get<TwelvedataStocksResponse>('stocks');

    return stocks;
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
