import { IsString } from 'class-validator';

export class GetStockPriceDTO {
  @IsString()
  symbol: string;

  @IsString()
  exchange: string;
}
