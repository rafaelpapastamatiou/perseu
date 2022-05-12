import schedule from 'node-schedule';

import { makePublishRequest } from '@main/factories/useCases/publish-request.factory';
import { twelvedataQueue } from '../queues/tweveldata.queue';
import {
  twelvedataSyncAssets,
  twelvedataSyncExchanges,
} from '../messageTypes/twelvedata.types';

const publishRequest = makePublishRequest(twelvedataQueue);

const rule = new schedule.RecurrenceRule();

rule.hour = 0;
//rule.minute = new schedule.Range(0, 59, 1);

schedule.scheduleJob(rule, async () => {
  console.log('Sending message');

  await publishRequest.execute({ type: twelvedataSyncExchanges });
});

schedule.scheduleJob(rule, async () => {
  console.log('Sending message');

  await publishRequest.execute({ type: twelvedataSyncAssets });
});

console.log('TwelveData schedules registered.');
