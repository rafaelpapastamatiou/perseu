import { makeRabbitMQ } from '@main/factories/providers/rabbitmq.factory';
import { makeFetchExchanges } from '@main/factories/useCases/exchanges/fetch-exchanges.factory';
import { makeFetchAssets } from '@main/factories/useCases/assets/fetch-assets.factory';
import {
  saveUsersAssetsLog,
  twelvedataSyncAssets,
  twelvedataSyncExchanges,
} from '../messageTypes/twelvedata.types';
import { twelvedataQueue } from '../queues/tweveldata.queue';
import { makeListUsers } from '@main/factories/useCases/users/list-users.factory';
import { makeGenerateUserAssetsLog } from '@main/factories/useCases/userAssetsLogs/generate-user-assets-log.factory';

const rabbitMQ = makeRabbitMQ();

async function setup() {
  rabbitMQ.consume(twelvedataQueue, async (msg, cb) => {
    try {
      console.log('Message received: ', msg.type);

      switch (msg.type) {
        case twelvedataSyncExchanges:
          const fetchExchanges = makeFetchExchanges();

          await fetchExchanges.execute();
          break;

        case twelvedataSyncAssets:
          const fetchAssets = makeFetchAssets();

          await fetchAssets.execute();
          break;

        case saveUsersAssetsLog:
          const listUsers = makeListUsers();
          const generateUserAssetsLog = makeGenerateUserAssetsLog();

          const users = await listUsers.execute();

          const usersAssetsLogsPromises = [];

          for (const user of users) {
            usersAssetsLogsPromises.push(
              generateUserAssetsLog.execute({ userId: user.id }),
            );
          }

          await Promise.all(usersAssetsLogsPromises);
          break;

        default:
          throw new Error('Invalid message type.');
      }

      return cb(null);
    } catch (err) {
      return cb(err);
    }
  });
}

setup();
