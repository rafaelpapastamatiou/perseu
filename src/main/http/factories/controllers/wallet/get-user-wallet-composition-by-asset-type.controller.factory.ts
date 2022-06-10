import { makeGetUserWalletCompositionByAssetType } from '@main/factories/useCases/wallet/get-user-wallet-composition-by-asset-type.factory';
import { GetUserWalletCompositionByAssetTypeController } from '@presentation/http/controllers/wallet/get-user-wallet-composition-by-asset-type';

export function makeGetUserWalletCompositionByAssetTypeController() {
  const getUserWalletCompositionByAssetType =
    makeGetUserWalletCompositionByAssetType();

  return new GetUserWalletCompositionByAssetTypeController(
    getUserWalletCompositionByAssetType,
  );
}
