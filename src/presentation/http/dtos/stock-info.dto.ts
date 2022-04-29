import { IsString } from 'class-validator';

export class StockInfoRequestDTO {
  @IsString()
  symbol: string;

  @IsString()
  exchange: string;
}

export class StockInfoResponseDTO {
  symbol: string;

  exchange: string;

  name: string;

  currency: string;
}
