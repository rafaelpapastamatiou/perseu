import { Type } from 'class-transformer';
import { IsNumber, Max } from 'class-validator';

export class ListUserAssetsRequestDTO {
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @Max(100)
  limit: number;
}
