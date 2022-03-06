import { makeGetStockInfo } from '@main/factories/useCases/get-stock-info.factory';
import { StockInfoController } from '@presentation/http/controllers/stock-info.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeStockInfoController(): Controller {
  const getStockInfo = makeGetStockInfo();

  return new StockInfoController(getStockInfo);
}
