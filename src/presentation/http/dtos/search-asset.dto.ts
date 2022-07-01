import { IsString } from 'class-validator';

export class SearchAssetDTO {
  @IsString()
  search: string;
}
