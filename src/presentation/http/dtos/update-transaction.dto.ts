import { TransactionTypes } from '@domain/entities/transaction';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateTransactionDTO {
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  unitValue?: number;

  @IsEnum(TransactionTypes)
  @IsOptional()
  type?: TransactionTypes;
}
