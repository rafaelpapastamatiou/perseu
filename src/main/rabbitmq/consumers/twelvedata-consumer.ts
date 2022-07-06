import { makeRabbitMQ } from '@main/factories/providers/rabbitmq.factory';
import { makeFetchExchanges } from '@main/factories/useCases/exchanges/fetch-exchanges.factory';
import { makeFetchAssets } from '@main/factories/useCases/assets/fetch-assets.factory';
import {
  twelvedataSyncAssets,
  twelvedataSyncExchanges,
} from '../messageTypes/twelvedata.types';
import { twelvedataQueue } from '../queues/tweveldata.queue';

const rabbitMQ = makeRabbitMQ();

async function setup() {
  rabbitMQ.consume(twelvedataQueue, async (msg, cb) => {
    try {
      console.log(`Message received: ${msg.type}. Queue: ${twelvedataQueue} `);

      switch (msg.type) {
        case twelvedataSyncExchanges:
          const fetchExchanges = makeFetchExchanges();

          await fetchExchanges.execute();
          break;

        case twelvedataSyncAssets:
          const fetchAssets = makeFetchAssets();

          await fetchAssets.execute();
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
