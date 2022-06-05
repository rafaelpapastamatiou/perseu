import { ListAssetTypes } from '@application/useCases/assetTypes/list-asset-types';
import { makeAssetTypesRepository } from '@main/factories/providers/repositories/asset-types.repository.factory';

export function makeListAssetTypes() {
  const assetTypesRepository = makeAssetTypesRepository();

  return new ListAssetTypes(assetTypesRepository);
}
