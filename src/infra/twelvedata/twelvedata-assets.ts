import {
  AssetsProvider,
  FindAssetParams,
  GetAssetProfileResult,
} from '@application/providers/assets';
import { Cache } from '@application/providers/cache';
import { twelveDataClient } from './twelvedata-client';
import { handleTwelvedataProviderError } from './utils/handleTwelvedataProviderError';

export class TwelvedataAssets implements AssetsProvider {
  private client = twelveDataClient;

  constructor(private cache: Cache) {}

  async getProfile({
    symbol,
    exchange,
  }: FindAssetParams): Promise<GetAssetProfileResult> {
    try {
      const cacheKey = `${symbol}-${exchange}-profile`;

      const cachedProfile = await this.cache.get<string>(cacheKey);

      if (cachedProfile)
        return JSON.parse(cachedProfile) as GetAssetProfileResult;

      const promises = [
        this.client.get('profile', {
          params: {
            symbol,
            exchange,
          },
        }),
        this.client.get('logo', {
          params: {
            symbol,
            exchange,
          },
        }),
      ];

      const [
        { data },
        {
          data: { url },
        },
      ] = await Promise.all(promises);

      const profile: GetAssetProfileResult = {
        ...data,
        logo: url,
      };

      await this.cache.set(cacheKey, profile);

      return profile;
    } catch (err) {
      handleTwelvedataProviderError(symbol, err);
    }
  }

  async getPriceBySymbol({
    symbol,
    exchange,
  }: FindAssetParams): Promise<number> {
    try {
      const cacheKey = `${symbol}-${exchange}-price`;

      const cachedPrice = await this.cache.get<string>(cacheKey);

      if (cachedPrice) return Number(cachedPrice);

      const { data } = await this.client.get<TwelvedataAssetPriceResponse>(
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

  async getEodPriceBySymbol({
    symbol,
    exchange,
  }: FindAssetParams): Promise<number> {
    try {
      const cacheKey = `${symbol}-${exchange}-eodPrice`;

      const cachedPrice = await this.cache.get<string>(cacheKey);

      if (cachedPrice) return Number(cachedPrice);

      const { data } = await this.client.get<TwelvedataAssetEodPriceResponse>(
        'eod',
        {
          params: {
            symbol,
            exchange,
          },
        },
      );

      await this.cache.set(cacheKey, data.close);

      return data.close;
    } catch (err) {
      handleTwelvedataProviderError(symbol, err);
    }
  }
}

type TwelvedataAssetPriceResponse = {
  price: number;
};

type TwelvedataAssetEodPriceResponse = {
  close: number;
};
