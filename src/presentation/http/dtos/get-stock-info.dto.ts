import { IsString } from 'class-validator';

export class GetStockInfoDTO {
  @IsString()
  symbol: string;

  @IsString()
  exchange: string;
}
