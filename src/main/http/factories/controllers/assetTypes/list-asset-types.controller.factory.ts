import { makeListAssetTypes } from '@main/factories/useCases/assetTypes/list-asset-types.factory';
import { ListAssetTypesController } from '@presentation/http/controllers/assetTypes/list-asset-types.controller';

export function makeListAssetTypesController() {
  const listAssetTypes = makeListAssetTypes();

  return new ListAssetTypesController(listAssetTypes);
}
