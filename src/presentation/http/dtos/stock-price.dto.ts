import { IsString } from 'class-validator';

export class StockPriceRequestDTO {
  @IsString()
  symbol: string;

  @IsString()
  exchange: string;
}
