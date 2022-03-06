import { makeGetStockPrice } from '@main/factories/useCases/get-stock-price.factory';
import { StockPriceController } from '@presentation/http/controllers/stock-price.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeStockPriceController(): Controller {
  const getStockPrice = makeGetStockPrice();

  return new StockPriceController(getStockPrice);
}
