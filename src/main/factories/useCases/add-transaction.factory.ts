import { AddTransaction } from '@application/useCases/transactions/add-transaction';
import { MongoUserAssetsRepository } from '@infra/database/mongodb/repositories/mongo-user-assets.repository';
import { MongoTransactionsRepository } from '@infra/database/mongodb/repositories/mongo-transactions.repository';
import { makeAddUserAsset } from './add-asset.factory';
import { MongoAssetsRepository } from '@infra/database/mongodb/repositories/mongo-assets.repository';
import { makeRedisCache } from '../providers/redis-cache.factory';
import { makePublishMessage } from './publish-message.factory';
import { internalQueue } from '@main/rabbitmq/queues/internal.queue';

export function makeAddTransaction(): AddTransaction {
  const cache = makeRedisCache();
  const transactionsRepository = new MongoTransactionsRepository();
  const usersAssetsRepository = new MongoUserAssetsRepository();
  const assetsRepository = new MongoAssetsRepository(cache);
  const addUserAsset = makeAddUserAsset();
  const publishMessage = makePublishMessage(internalQueue);

  return new AddTransaction(
    transactionsRepository,
    usersAssetsRepository,
    assetsRepository,
    addUserAsset,
    publishMessage,
  );
}
