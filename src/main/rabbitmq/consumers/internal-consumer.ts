import { makeRabbitMQ } from '@main/factories/providers/rabbitmq.factory';
import {
  saveUserAssetsLog,
  saveUsersAssetsLog,
} from '../messageTypes/twelvedata.types';
import { makeListUsers } from '@main/factories/useCases/users/list-users.factory';
import { makeGenerateUserAssetsLog } from '@main/factories/useCases/userAssetsLogs/generate-user-assets-log.factory';
import { internalQueue } from '../queues/internal.queue';

const rabbitMQ = makeRabbitMQ();
const generateUserAssetsLog = makeGenerateUserAssetsLog();

async function setup() {
  rabbitMQ.consume(internalQueue, async (msg, cb) => {
    try {
      console.log(`Message received: ${msg.type}. Queue: ${internalQueue} `);

      switch (msg.type) {
        case saveUsersAssetsLog:
          const listUsers = makeListUsers();

          const users = await listUsers.execute();

          const usersAssetsLogsPromises = [];

          for (const user of users) {
            usersAssetsLogsPromises.push(
              generateUserAssetsLog.execute({
                userId: user.id,
                date: new Date(msg.content),
              }),
            );
          }

          await Promise.all(usersAssetsLogsPromises);
          break;

        case saveUserAssetsLog:
          const { userId, date }: { userId: string; date: Date } = msg.content
            ? JSON.parse(msg.content)
            : {};

          await generateUserAssetsLog.execute({
            userId,
            date: new Date(date),
          });
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
