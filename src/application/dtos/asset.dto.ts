import { Asset } from '@domain/entities/asset';

export class AssetDTO {
  id: string;
  symbol: string;
  type: string;
  quantity: number;
  exchange: string;
  userId: string;

  static fromDomain(asset: Asset): AssetDTO {
    const dto = new AssetDTO();

    dto.id = asset.id;
    dto.symbol = asset.symbol;
    dto.type = asset.type;
    dto.quantity = asset.quantity;
    dto.exchange = asset.exchange;
    dto.userId = asset.userId;

    return dto;
  }
}
