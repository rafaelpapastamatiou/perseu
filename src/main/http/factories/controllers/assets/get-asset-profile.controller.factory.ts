import { makeGetAssetProfile } from '@main/factories/useCases/assets/get-asset-profile.factory';
import { GetAssetProfileController } from '@presentation/http/controllers/assets/get-asset-profile.controller';

export function makeGetAssetProfileController() {
  const getAssetProfile = makeGetAssetProfile();

  return new GetAssetProfileController(getAssetProfile);
}
