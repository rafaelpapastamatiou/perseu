import { TransactionDTO } from '@application/dtos/transaction.dto';
import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { TransactionsRepository } from '@application/providers/repositories/transactions.repository';
import { UpdateAssetPayload } from '@domain/entities/asset';
import {
  UpdateTransactionPayload,
  TransactionTypes,
} from '@domain/entities/transaction';
import { InvalidParamException } from '@domain/exceptions/invalid-param.exception';
import { NotFoundException } from '@domain/exceptions/not-found.exception';
import { UseCase } from '@domain/interfaces/use-case';

export type UpdateTransactionIdentifier = {
  userId: string;
  id: string;
};

export type UpdateTransactionInterface = UseCase<
  [UpdateTransactionIdentifier, UpdateTransactionPayload],
  TransactionDTO
>;

export class UpdateTransaction implements UpdateTransactionInterface {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private assetsRepository: AssetsRepository,
  ) {}

  async execute(
    { id, userId }: UpdateTransactionIdentifier,
    payload: UpdateTransactionPayload,
  ): Promise<TransactionDTO> {
    if (payload.quantity !== undefined && payload.quantity <= 0) {
      throw new InvalidParamException(
        'Asset quantity of transaction must be greater than zero.',
      );
    }

    const transaction = await this.transactionsRepository.findById({
      id,
      userId,
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }

    const asset = await this.assetsRepository.findBySymbol({
      userId,
      symbol: transaction.symbol,
    });

    if (!asset) {
      throw new NotFoundException('Asset not found.');
    }

    let updateAssetPayload: UpdateAssetPayload;

    if (payload.quantity > 0) {
      const newTransactionType = payload.type || transaction.type;

      switch (newTransactionType) {
        case TransactionTypes.PURCHASE:
          if (newTransactionType === transaction.type) {
            const newAssetQuantity =
              asset.quantity - transaction.quantity + payload.quantity;

            if (newAssetQuantity < 0) {
              throw new InvalidParamException(
                'Can´t update purchase transaction because he result asset quantity is negative.',
              );
            }

            updateAssetPayload = {
              ...(updateAssetPayload || {}),
              quantity:
                asset.quantity - transaction.quantity + payload.quantity,
            };
          } else {
            updateAssetPayload = {
              ...(updateAssetPayload || {}),
              quantity:
                asset.quantity + transaction.quantity + payload.quantity,
            };
          }
          break;

        case TransactionTypes.SALE:
          if (newTransactionType === transaction.type) {
            const newAssetQuantity =
              asset.quantity + transaction.quantity - payload.quantity;

            if (newAssetQuantity < 0) {
              throw new InvalidParamException(
                `Sold assets quantity is greater than current assets quantity.`,
              );
            }

            updateAssetPayload = {
              ...(updateAssetPayload || {}),
              quantity: newAssetQuantity,
            };
          } else {
            const newAssetQuantity =
              asset.quantity - transaction.quantity - payload.quantity;

            if (newAssetQuantity < 0) {
              throw new InvalidParamException(
                `Sold assets quantity is greater than current assets quantity.`,
              );
            }

            updateAssetPayload = {
              ...(updateAssetPayload || {}),
              quantity:
                asset.quantity - transaction.quantity - payload.quantity,
            };
          }
          break;

        default:
          break;
      }
    }

    if (updateAssetPayload) {
      asset.update(updateAssetPayload);

      await this.assetsRepository.update(asset);
    }

    transaction.update(payload);

    await this.transactionsRepository.update(transaction);

    return TransactionDTO.fromDomain(transaction);
  }
}
