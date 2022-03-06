import { GetStockPrice } from '@application/useCases/stocks/get-stock-price';
import { GetStockPriceSignature } from '@domain/useCases/stocks/get-stock-price';
import { makeTwelvedataStocks } from '../providers/twelvedata-stocks.factory';

export function makeGetStockPrice(): GetStockPriceSignature {
  const twelvedataStocks = makeTwelvedataStocks();

  return new GetStockPrice(twelvedataStocks);
}
