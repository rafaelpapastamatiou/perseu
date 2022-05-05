import { TransactionDTO } from '@application/dtos/transaction.dto';
import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { TransactionsRepository } from '@application/providers/repositories/transactions.repository';
import { UpdateAssetPayload } from '@domain/entities/asset';
import {
  CreateTransactionPayload,
  Transaction,
} from '@domain/entities/transaction';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { UseCase } from '@domain/interfaces/use-case';
import { AddAsset } from '../assets/add-asset';

export class AddTransaction implements UseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private assetsRepository: AssetsRepository,
    private addAsset: AddAsset,
  ) {}

  async execute(payload: CreateTransactionPayload): Promise<TransactionDTO> {
    if (payload.quantity <= 0) {
      throw new InvalidParamException(
        'Asset quantity from transaction must be greater than zero.',
      );
    }

    const id = await this.transactionsRepository.generateId();

    if (!id) {
      throw new Error('Error generating id for transaction.');
    }

    const transaction = Transaction.create(id, payload);

    const asset = await this.assetsRepository.findBySymbol({
      symbol: payload.symbol,
      userId: payload.userId,
    });

    if (!asset) {
      if (payload.type === 'sale') {
        throw new InvalidParamException(
          'Can´t register a sale transaction because you don´t have any asset.',
        );
      }

      await this.transactionsRepository.add(transaction);

      await this.addAsset.execute({
        exchange: payload.exchange,
        symbol: payload.symbol,
        quantity: payload.quantity,
        userId: payload.userId,
        type: '',
      });

      return TransactionDTO.fromDomain(transaction);
    }

    let updateAssetPayload: UpdateAssetPayload;

    if (payload.type === 'sale') {
      if (payload.quantity > asset.quantity) {
        throw new InvalidParamException(
          `Sold assets quantity is greater than current assets quantity.`,
        );
      }

      updateAssetPayload = {
        quantity: asset.quantity - payload.quantity,
      };
    } else {
      updateAssetPayload = {
        quantity: asset.quantity + payload.quantity,
      };
    }

    await this.transactionsRepository.add(transaction);

    asset.update(updateAssetPayload);

    await this.assetsRepository.update(asset);

    return TransactionDTO.fromDomain(transaction);
  }
}
