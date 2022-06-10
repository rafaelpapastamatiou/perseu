import { TransactionDTO } from '@application/dtos/transaction.dto';
import { UserAssetsRepository } from '@application/providers/repositories/user-assets.repository';
import { TransactionsRepository } from '@application/providers/repositories/transactions.repository';
import { UpdateUserAssetPayload } from '@domain/entities/user-asset';
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
    private userAssetsRepository: UserAssetsRepository,
  ) {}

  async execute(
    { id, userId }: UpdateTransactionIdentifier,
    payload: UpdateTransactionPayload,
  ): Promise<TransactionDTO> {
    if (payload.quantity !== undefined && payload.quantity <= 0)
      throw new InvalidParamException(
        "Transaction's asset quantity must be greater than zero.",
      );

    const transaction = await this.transactionsRepository.findById({
      id,
      userId,
    });

    if (!transaction) throw new NotFoundException('Transaction not found.');

    const userAsset = await this.userAssetsRepository.findBySymbol({
      userId,
      symbol: transaction.symbol,
    });

    if (!userAsset) throw new NotFoundException('User asset not found.');

    let updateUserAssetPayload: UpdateUserAssetPayload;

    if (payload.quantity > 0) {
      const newTransactionType = payload.type || transaction.type;

      switch (newTransactionType) {
        case TransactionTypes.PURCHASE:
          if (newTransactionType === transaction.type) {
            const newAssetQuantity =
              userAsset.quantity - transaction.quantity + payload.quantity;

            if (newAssetQuantity < 0)
              throw new InvalidParamException(
                'Can´t update purchase transaction because he result asset quantity is negative.',
              );

            updateUserAssetPayload = {
              quantity: newAssetQuantity,
            };
          } else {
            updateUserAssetPayload = {
              quantity:
                userAsset.quantity + transaction.quantity + payload.quantity,
            };
          }

          break;

        case TransactionTypes.SALE:
          if (newTransactionType === transaction.type) {
            const newUserAssetQuantity =
              userAsset.quantity + transaction.quantity - payload.quantity;

            if (newUserAssetQuantity < 0)
              throw new InvalidParamException(
                `Sold assets quantity is greater than current assets quantity.`,
              );

            updateUserAssetPayload = {
              quantity: newUserAssetQuantity,
            };
          } else {
            const newUserAssetQuantity =
              userAsset.quantity - transaction.quantity - payload.quantity;

            if (newUserAssetQuantity < 0) {
              throw new InvalidParamException(
                `Sold assets quantity is greater than current assets quantity.`,
              );
            }

            updateUserAssetPayload = {
              quantity: newUserAssetQuantity,
            };
          }

          break;

        default:
          break;
      }
    }

    if (updateUserAssetPayload) {
      userAsset.update(updateUserAssetPayload);

      await this.userAssetsRepository.update(userAsset);
    }

    transaction.update(payload);

    await this.transactionsRepository.update(transaction);

    return TransactionDTO.fromDomain(transaction);
  }
}
