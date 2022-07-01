import schedule from 'node-schedule';

import { makePublishMessage } from '@main/factories/useCases/publish-message.factory';
import { twelvedataQueue } from '../queues/tweveldata.queue';
import {
  saveUsersAssetsLog,
  twelvedataSyncAssets,
  twelvedataSyncExchanges,
} from '../messageTypes/twelvedata.types';

const publishMessage = makePublishMessage(twelvedataQueue);

const rule = new schedule.RecurrenceRule();

rule.hour = 0;
//rule.minute = new schedule.Range(0, 59, 1);

schedule.scheduleJob(rule, async () => {
  console.log('Sending message: ', twelvedataSyncExchanges);

  await publishMessage.execute({ type: twelvedataSyncExchanges });
});

schedule.scheduleJob(rule, async () => {
  console.log('Sending message: ', twelvedataSyncAssets);

  await publishMessage.execute({ type: twelvedataSyncAssets });
});

schedule.scheduleJob(rule, async () => {
  console.log('Sending message: ', saveUsersAssetsLog);

  await publishMessage.execute({ type: saveUsersAssetsLog });
});

console.log('TwelveData schedules registered.');
