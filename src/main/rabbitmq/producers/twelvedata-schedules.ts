import schedule from 'node-schedule';

import { makePublishMessage } from '@main/factories/useCases/publish-message.factory';
import {
  saveUsersAssetsLog,
  twelvedataSyncAssets,
  twelvedataSyncExchanges,
} from '../messageTypes/twelvedata.types';
import { twelvedataQueue } from '../queues/tweveldata.queue';
import { internalQueue } from '../queues/internal.queue';

const twelveDataPublishMessage = makePublishMessage(twelvedataQueue);
const publishMessage = makePublishMessage(internalQueue);

const everyDayRule = new schedule.RecurrenceRule();
everyDayRule.hour = 0;

const everyHourRule = new schedule.RecurrenceRule();
everyHourRule.minute = 0;

//rule.minute = new schedule.Range(0, 59, 1);

schedule.scheduleJob(everyDayRule, async () => {
  console.log('Sending message: ', twelvedataSyncExchanges);

  await twelveDataPublishMessage.execute({ type: twelvedataSyncExchanges });
});

schedule.scheduleJob(everyDayRule, async () => {
  console.log('Sending message: ', twelvedataSyncAssets);

  await twelveDataPublishMessage.execute({ type: twelvedataSyncAssets });
});

schedule.scheduleJob(everyHourRule, async () => {
  console.log('Sending message: ', saveUsersAssetsLog);

  await publishMessage.execute({
    type: saveUsersAssetsLog,
    content: new Date().toISOString(),
  });
});

console.log('Schedules registered.');
