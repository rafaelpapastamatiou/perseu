import { TransactionDTO } from '@application/dtos/transaction.dto';
import { UserAssetsRepository } from '@application/providers/repositories/user-assets.repository';
import { TransactionsRepository } from '@application/providers/repositories/transactions.repository';
import { UpdateUserAssetPayload } from '@domain/entities/user-asset';
import {
  CreateTransactionPayload,
  Transaction,
} from '@domain/entities/transaction';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { UseCase } from '@domain/interfaces/use-case';
import { AddUserAssetInterface } from '../usersAssets/add-user-asset';
import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { NotFoundException } from '@domain/exceptions/not-found.exception';

export type AddTransactionInterface = UseCase<
  [CreateTransactionPayload],
  TransactionDTO
>;

export class AddTransaction implements AddTransactionInterface {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private usersAssetsRepository: UserAssetsRepository,
    private assetsRepository: AssetsRepository,
    private addAsset: AddUserAssetInterface,
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

    const userAsset = await this.usersAssetsRepository.findBySymbol({
      symbol: payload.symbol,
      userId: payload.userId,
    });

    if (!userAsset) {
      if (payload.type === 'sale') {
        throw new InvalidParamException(
          'Can´t register a sale transaction because you don´t have any asset.',
        );
      }

      const asset = await this.assetsRepository.findBySymbol({
        symbol: payload.symbol,
        exchange: payload.exchange,
      });

      if (!asset) {
        throw new NotFoundException('Asset not found on our database.');
      }

      await this.transactionsRepository.add(transaction);

      await this.addAsset.execute({
        exchange: payload.exchange,
        symbol: payload.symbol,
        quantity: payload.quantity,
        userId: payload.userId,
        type: asset.type?.name,
      });

      return TransactionDTO.fromDomain(transaction);
    }

    let updateAssetPayload: UpdateUserAssetPayload;

    if (payload.type === 'sale') {
      if (payload.quantity > userAsset.quantity) {
        throw new InvalidParamException(
          `Sold assets quantity is greater than current assets quantity.`,
        );
      }

      updateAssetPayload = {
        quantity: userAsset.quantity - payload.quantity,
      };
    } else {
      updateAssetPayload = {
        quantity: userAsset.quantity + payload.quantity,
      };
    }

    await this.transactionsRepository.add(transaction);

    userAsset.update(updateAssetPayload);

    await this.usersAssetsRepository.update(userAsset);

    return TransactionDTO.fromDomain(transaction);
  }
}
