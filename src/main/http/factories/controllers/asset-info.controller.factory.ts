import { makeGetAssetInfo } from '@main/factories/useCases/assets/get-asset-info.factory';
import { StockInfoController } from '@presentation/http/controllers/stock-info.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeStockInfoController(): Controller {
  const GetAssetInfo = makeGetAssetInfo();

  return new StockInfoController(GetAssetInfo);
}
