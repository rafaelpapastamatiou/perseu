import { GetStockInfo } from '@application/useCases/stocks/get-stock-info';
import { makeTwelvedataStocks } from '../providers/twelvedata-stocks.factory';

export function makeGetStockInfo(): GetStockInfo {
  const twelvedataStocks = makeTwelvedataStocks();

  return new GetStockInfo(twelvedataStocks);
}
