import { makeGetAssetPrice } from '@main/factories/useCases/assets/get-asset-price.factory';
import { AssetPriceController } from '@presentation/http/controllers/stock-price.controller';
import { Controller } from '@presentation/http/protocols/controller';

export function makeAssetPriceController(): Controller {
  const getAssetType = makeGetAssetPrice();

  return new AssetPriceController(getAssetType);
}
