import { IsString } from 'class-validator';

export class GetAssetProfileRequestDTO {
  @IsString()
  symbol: string;

  @IsString()
  exchange: string;
}
