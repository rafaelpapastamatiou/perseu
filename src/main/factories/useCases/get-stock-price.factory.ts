import { GetStockPrice } from '@application/useCases/stocks/get-stock-price';
import { makeTwelvedataStocks } from '../providers/twelvedata-stocks.factory';

export function makeGetStockPrice(): GetStockPrice {
  const twelvedataStocks = makeTwelvedataStocks();

  return new GetStockPrice(twelvedataStocks);
}
