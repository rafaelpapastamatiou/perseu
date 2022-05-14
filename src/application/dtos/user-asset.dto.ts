import { UserAsset } from '@domain/entities/user-asset';

export class UserAssetDTO {
  id: string;
  symbol: string;
  type: string;
  quantity: number;
  exchange: string;
  userId: string;

  static fromDomain(userAsset: UserAsset): UserAssetDTO {
    const dto = new UserAssetDTO();

    dto.id = userAsset.id;
    dto.symbol = userAsset.symbol;
    dto.type = userAsset.type;
    dto.quantity = userAsset.quantity;
    dto.exchange = userAsset.exchange;
    dto.userId = userAsset.userId;

    return dto;
  }
}
