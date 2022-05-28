import {
  FetchStockResult,
  FindStockParams,
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

type TwelvedataStockPriceResponse = {
  price: number;
};

type TwelvedataStocksResponse = {
  data: TwelvedataStockData[];
};

export class TwelvedataStocks implements Stocks {
  private client = twelveDataClient;

  constructor(private cache: Cache) {}

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
