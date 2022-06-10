import {
  FindByIdWithAuth,
  FindWithAuth,
} from '@application/protocols/repository.protocols';
import { TransactionsRepository } from '@application/providers/repositories/transactions.repository';
import { Transaction } from '@domain/entities/transaction';
import { Model, Types } from 'mongoose';
import { MongoHelper } from '../mongo-helper';
import {
  TransactionDocument,
  TransactionModel,
} from '../schemas/transaction.schema';

export class MongoTransactionsRepository implements TransactionsRepository {
  transactionModel: Model<TransactionDocument> = TransactionModel;

  async find({ userId }: FindWithAuth): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find({
      userId: MongoHelper.objectId(userId),
    });

    return transactions.map((transaction) =>
      MongoHelper.mapToClass<Transaction>(transaction, Transaction.prototype),
    );
  }

  async findById({
    id,
    userId,
  }: FindByIdWithAuth): Promise<Transaction | undefined> {
    const transaction = await this.transactionModel.findOne({
      _id: MongoHelper.objectId(id),
      userId: MongoHelper.objectId(userId),
    });

    if (!transaction) return undefined;

    return MongoHelper.mapToClass<Transaction>(
      transaction,
      Transaction.prototype,
    );
  }

  async add(transaction: Transaction): Promise<void> {
    await this.transactionModel.create(
      MongoHelper.mapToDocument<TransactionDocument>(transaction),
    );
  }

  async update({ id, userId, ...transaction }: Transaction): Promise<void> {
    await this.transactionModel.findOneAndUpdate(
      {
        _id: MongoHelper.objectId(id),
        userId: MongoHelper.objectId(userId),
      },
      transaction,
    );
  }

  async generateId(): Promise<string> {
    const id = new Types.ObjectId();

    return id.toString();
  }
}
