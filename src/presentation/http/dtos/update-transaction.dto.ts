import { TransactionDTO } from '@application/dtos/transaction.dto';
import { TransactionTypes } from '@domain/entities/transaction';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateTransactionRequestDTO {
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

export type UpdateTransactionResponseDTO = TransactionDTO;
