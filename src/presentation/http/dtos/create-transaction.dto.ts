import { TransactionTypes } from '@domain/entities/transaction';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTransactionRequestDTO {
  @IsEnum(TransactionTypes)
  type: TransactionTypes;

  @IsString()
  symbol: string;

  @IsString()
  exchange: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitValue: number;

  @IsDateString()
  date: string;
}
